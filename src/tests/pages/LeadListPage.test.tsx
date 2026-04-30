import LeadListPage from '@/features/leads/pages/LeadListPage'
import { LeadsApi } from '@/features/leads/services/leads.api'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/icons/Icon', () => ({
    default: ({ name }: { name: string }) => <span data-testid={`icon-${name}`} />,
}))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))
vi.mock('@/lib/handle-error', () => ({ handleError: vi.fn() }))
vi.mock('@/features/leads/services/leads.api')

const mockNavigate = vi.fn()
const mockSearch = vi.fn()

vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => mockNavigate,
    useSearch: () => mockSearch(),
}))

const mockLeads = [
    {
        id: '1',
        nome: 'João Silva',
        cpf: '52998224725',
        estadoCivil: MaritalStatusEnum.SINGLE,
        nomeConjuge: undefined,
        email: 'joao@email.com',
        telefone: '11999999999',
    },
    {
        id: '2',
        nome: 'Maria Santos',
        cpf: '11111111111',
        estadoCivil: MaritalStatusEnum.MARRIED,
        nomeConjuge: 'Pedro Santos',
        email: 'maria@email.com',
        telefone: '11888888888',
    },
]

function renderPage() {
    const user = userEvent.setup()
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
        <QueryClientProvider client={queryClient}>
            <LeadListPage />
        </QueryClientProvider>
    )
    return { user }
}

describe('LeadListPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockSearch.mockReturnValue({})
        vi.mocked(LeadsApi.list).mockResolvedValue(mockLeads)
        vi.mocked(LeadsApi.delete).mockResolvedValue(undefined)
    })

    describe('listing', () => {
        it('renders leads returned by the API', async () => {
            renderPage()
            await waitFor(() => {
                expect(screen.getAllByText('João Silva').length).toBeGreaterThan(0)
                expect(screen.getAllByText('Maria Santos').length).toBeGreaterThan(0)
            })
        })

        it('shows "Nenhum lead cadastrado" when list is empty and no filters are active', async () => {
            vi.mocked(LeadsApi.list).mockResolvedValue([])
            renderPage()
            await waitFor(() => {
                expect(screen.getByText('Nenhum lead cadastrado')).toBeInTheDocument()
            })
        })

        it('shows "Nenhum lead encontrado" when list is empty with active filters', async () => {
            mockSearch.mockReturnValue({ nome: 'Inexistente' })
            vi.mocked(LeadsApi.list).mockResolvedValue([])
            renderPage()
            await waitFor(() => {
                expect(screen.getByText('Nenhum lead encontrado')).toBeInTheDocument()
            })
        })
    })

    describe('filters', () => {
        it('navigates with name filter when Filter is clicked', async () => {
            const { user } = renderPage()
            await user.type(screen.getByLabelText(/nome do cliente/i), 'João')
            await user.click(screen.getByRole('button', { name: /filtrar/i }))
            expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({ search: expect.objectContaining({ nome: 'João' }) }))
        })

        it('navigates without filters when Clear All is clicked', async () => {
            const { user } = renderPage()
            await user.click(screen.getByRole('button', { name: /limpar tudo/i }))
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/leads', search: {} })
        })
    })

    describe('delete', () => {
        it('opens confirmation dialog when delete is clicked', async () => {
            const { user } = renderPage()
            await waitFor(() => expect(screen.getAllByText('João Silva').length).toBeGreaterThan(0))

            await user.click(screen.getAllByTestId('icon-trash')[0].closest('button')!)

            expect(screen.getByRole('dialog')).toBeInTheDocument()
            expect(screen.getByText('Excluir lead')).toBeInTheDocument()
        })

        it('calls the API and shows toast on delete confirmation', async () => {
            const { toast } = await import('@/lib/toast')
            const { user } = renderPage()
            await waitFor(() => expect(screen.getAllByText('João Silva').length).toBeGreaterThan(0))

            await user.click(screen.getAllByTestId('icon-trash')[0].closest('button')!)

            const dialog = screen.getByRole('dialog')
            await user.click(within(dialog).getByRole('button', { name: /confirmar/i }))

            await waitFor(() => {
                expect(LeadsApi.delete).toHaveBeenCalledWith('1')
                expect(toast.success).toHaveBeenCalledWith('Lead excluído com sucesso!')
            })
        })

        it('closes the dialog on cancel', async () => {
            const { user } = renderPage()
            await waitFor(() => expect(screen.getAllByText('João Silva').length).toBeGreaterThan(0))

            await user.click(screen.getAllByTestId('icon-trash')[0].closest('button')!)
            expect(screen.getByRole('dialog')).toBeInTheDocument()

            const dialog = screen.getByRole('dialog')
            await user.click(within(dialog).getByRole('button', { name: /cancelar/i }))

            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
            })
        })
    })
})
