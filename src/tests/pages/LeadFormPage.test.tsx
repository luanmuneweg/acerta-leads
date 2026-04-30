import LeadFormPage from '@/features/leads/pages/LeadFormPage'
import { LeadsApi } from '@/features/leads/services/leads.api'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/icons/Icon', () => ({ default: () => null }))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn() } }))
vi.mock('@/lib/handle-error', () => ({ handleError: vi.fn() }))
vi.mock('@/features/leads/services/leads.api')

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => mockNavigate,
}))

const mockMaritalStatuses = [
    { id: 1, nome: 'Solteiro(a)' },
    { id: 2, nome: 'Casado(a)' },
]

const mockLead = {
    id: '1',
    nome: 'João Silva',
    cpf: '52998224725',
    estadoCivil: MaritalStatusEnum.SINGLE,
    nomeConjuge: undefined,
    email: 'joao@email.com',
    telefone: '11999999999',
}

function renderPage(id?: string) {
    const user = userEvent.setup()
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(
        <QueryClientProvider client={queryClient}>
            <LeadFormPage id={id} />
        </QueryClientProvider>
    )
    return { user }
}

describe('LeadFormPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(LeadsApi.listMaritalStatuses).mockResolvedValue(mockMaritalStatuses)
        vi.mocked(LeadsApi.create).mockResolvedValue({ ...mockLead })
        vi.mocked(LeadsApi.update).mockResolvedValue({ ...mockLead })
        vi.mocked(LeadsApi.getById).mockResolvedValue({ ...mockLead })
    })

    it('create flow: step 1 → step 2 → calls create and navigates', async () => {
        const { toast } = await import('@/lib/toast')
        const { user } = renderPage()

        await waitFor(() => expect(screen.getByRole('combobox')).toBeInTheDocument())

        await user.type(screen.getByLabelText(/cpf/i), '52998224725')
        await user.type(screen.getByLabelText(/nome do cliente/i), 'João Silva')
        await user.click(screen.getByRole('combobox'))
        await user.click(await screen.findByRole('option', { name: /solteiro/i }))
        await user.click(screen.getByRole('button', { name: /avançar/i }))

        await waitFor(() => expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument())

        await user.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
        await user.type(screen.getByLabelText(/telefone/i), '11999999999')
        await user.click(screen.getByRole('button', { name: /cadastrar/i }))

        await waitFor(() => {
            expect(LeadsApi.create).toHaveBeenCalledWith(expect.objectContaining({ nome: 'João Silva', email: 'joao@email.com' }))
            expect(toast.success).toHaveBeenCalledWith('Lead cadastrado com sucesso!')
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/leads' })
        })
    })

    it('edit flow: pre-fills form, calls update and navigates', async () => {
        const { toast } = await import('@/lib/toast')
        const { user } = renderPage('1')

        await waitFor(() => {
            expect(screen.getByLabelText(/nome do cliente/i)).toHaveValue('João Silva')
        })

        await user.click(screen.getByRole('button', { name: /avançar/i }))
        await waitFor(() => expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument())

        await user.click(screen.getByRole('button', { name: /salvar/i }))

        await waitFor(() => {
            expect(LeadsApi.update).toHaveBeenCalledWith('1', expect.objectContaining({ nome: 'João Silva', email: 'joao@email.com' }))
            expect(toast.success).toHaveBeenCalledWith('Lead atualizado com sucesso!')
            expect(mockNavigate).toHaveBeenCalledWith({ to: '/leads' })
        })
    })
})
