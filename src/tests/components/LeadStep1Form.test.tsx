import LeadStep1Form from '@/features/leads/components/LeadStep1Form'
import { LeadAdapter } from '@/features/leads/adapters/lead.adapter'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/icons/Icon', () => ({ default: () => null }))

const maritalStatusOptions = [
    { label: 'Solteiro(a)', value: MaritalStatusEnum.SINGLE },
    { label: 'Casado(a)', value: MaritalStatusEnum.MARRIED },
    { label: 'Viúvo(a)', value: MaritalStatusEnum.WIDOWED },
    { label: 'Separado(a)', value: MaritalStatusEnum.SEPARATED },
]

function renderForm({ onAdvance = vi.fn(), onCancel = vi.fn() } = {}) {
    const user = userEvent.setup()
    render(
        <LeadStep1Form defaultValues={LeadAdapter.defaultStep1Values()} maritalStatusOptions={maritalStatusOptions} onAdvance={onAdvance} onCancel={onCancel} />
    )
    return { onAdvance, onCancel, user }
}

describe('LeadStep1Form', () => {
    describe('advance', () => {
        it('does not call onAdvance when fields are empty', async () => {
            const { onAdvance, user } = renderForm()
            await user.click(screen.getByRole('button', { name: /avançar/i }))
            expect(onAdvance).not.toHaveBeenCalled()
        })

        it('calls onAdvance with valid data for single status', async () => {
            const { onAdvance, user } = renderForm()

            await user.type(screen.getByLabelText(/cpf/i), '529.982.247-25')
            await user.type(screen.getByLabelText(/nome do cliente/i), 'João Silva')

            await user.click(screen.getByRole('combobox'))
            await user.click(await screen.findByRole('option', { name: /solteiro/i }))

            await user.click(screen.getByRole('button', { name: /avançar/i }))

            await waitFor(() => {
                expect(onAdvance).toHaveBeenCalledOnce()
                expect(onAdvance).toHaveBeenCalledWith(
                    expect.objectContaining({
                        name: 'João Silva',
                        cpf: '529.982.247-25',
                        maritalStatus: MaritalStatusEnum.SINGLE,
                    }),
                    expect.anything()
                )
            })
        })

        it('shows error and does not advance when married without spouse name', async () => {
            const { onAdvance, user } = renderForm()

            await user.type(screen.getByLabelText(/cpf/i), '529.982.247-25')
            await user.type(screen.getByLabelText(/nome do cliente/i), 'João Silva')

            await user.click(screen.getByRole('combobox'))
            await user.click(await screen.findByRole('option', { name: /casado/i }))

            await user.click(screen.getByRole('button', { name: /avançar/i }))

            await waitFor(() => {
                expect(screen.getByText(/nome do cônjuge é obrigatório/i)).toBeInTheDocument()
            })
            expect(onAdvance).not.toHaveBeenCalled()
        })
    })

    describe('conditional spouse field', () => {
        it('spouse field is disabled by default', () => {
            renderForm()
            expect(screen.getByLabelText(/nome do cônjuge/i)).toBeDisabled()
        })

        it('enables spouse field when married is selected', async () => {
            const { user } = renderForm()

            await user.click(screen.getByRole('combobox'))
            await user.click(await screen.findByRole('option', { name: /casado/i }))

            expect(screen.getByLabelText(/nome do cônjuge/i)).toBeEnabled()
        })

        it('disables and clears spouse field when marital status changes', async () => {
            const { user } = renderForm()

            await user.click(screen.getByRole('combobox'))
            await user.click(await screen.findByRole('option', { name: /casado/i }))

            await user.type(screen.getByLabelText(/nome do cônjuge/i), 'Maria')

            await user.click(screen.getByRole('combobox'))
            await user.click(await screen.findByRole('option', { name: /solteiro/i }))

            await waitFor(() => {
                const spouseInput = screen.getByLabelText(/nome do cônjuge/i)
                expect(spouseInput).toBeDisabled()
                expect(spouseInput).toHaveValue('')
            })
        })
    })

    describe('cancel', () => {
        it('calls onCancel when Cancel is clicked', async () => {
            const { onCancel, user } = renderForm()
            await user.click(screen.getByRole('button', { name: /cancelar/i }))
            expect(onCancel).toHaveBeenCalledOnce()
        })
    })
})
