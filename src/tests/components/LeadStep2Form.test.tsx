import LeadStep2Form from '@/features/leads/components/LeadStep2Form'
import { LeadAdapter } from '@/features/leads/adapters/lead.adapter'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/icons/Icon', () => ({ default: () => null }))

function renderForm({ isEdit = false, isSaving = false, onSubmit = vi.fn(), onBack = vi.fn() } = {}) {
    const user = userEvent.setup()
    render(<LeadStep2Form defaultValues={LeadAdapter.defaultStep2Values()} isEdit={isEdit} isSaving={isSaving} onSubmit={onSubmit} onBack={onBack} />)
    return { onSubmit, onBack, user }
}

describe('LeadStep2Form', () => {
    describe('submit', () => {
        it('does not call onSubmit when fields are empty', async () => {
            const { onSubmit, user } = renderForm()
            await user.click(screen.getByRole('button', { name: /cadastrar/i }))
            expect(onSubmit).not.toHaveBeenCalled()
        })

        it('calls onSubmit with valid data', async () => {
            const { onSubmit, user } = renderForm()

            await user.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
            await user.type(screen.getByLabelText(/telefone/i), '(11) 99999-9999')

            await user.click(screen.getByRole('button', { name: /cadastrar/i }))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledOnce()
                expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ email: 'joao@email.com', phone: '(11) 99999-9999' }), expect.anything())
            })
        })

        it('shows invalid email error', async () => {
            const { user } = renderForm()

            await user.type(screen.getByLabelText(/e-mail/i), 'not-an-email')
            await user.click(screen.getByRole('button', { name: /cadastrar/i }))

            await waitFor(() => {
                expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument()
            })
        })

        it('shows invalid phone error', async () => {
            const { user } = renderForm()

            await user.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
            await user.type(screen.getByLabelText(/telefone/i), '(11) 9999')

            await user.click(screen.getByRole('button', { name: /cadastrar/i }))

            await waitFor(() => {
                expect(screen.getByText(/telefone inválido/i)).toBeInTheDocument()
            })
        })

        it('disables the submit button while saving', () => {
            renderForm({ isSaving: true })
            expect(screen.getByRole('button', { name: /cadastrar/i })).toBeDisabled()
        })
    })

    describe('submit button label', () => {
        it('shows "Cadastrar" in create mode', () => {
            renderForm({ isEdit: false })
            expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
        })

        it('shows "Salvar" in edit mode', () => {
            renderForm({ isEdit: true })
            expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
        })
    })

    describe('back', () => {
        it('calls onBack when Back is clicked', async () => {
            const { onBack, user } = renderForm()
            await user.click(screen.getByRole('button', { name: /voltar/i }))
            expect(onBack).toHaveBeenCalledOnce()
        })
    })
})
