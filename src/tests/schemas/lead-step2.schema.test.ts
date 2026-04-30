import { leadStep2Schema } from '@/features/leads/schemas/lead-step2.schema'
import { describe, expect, it } from 'vitest'

describe('leadStep2Schema', () => {
    it('accepts valid data', () => {
        const result = leadStep2Schema.safeParse({ email: 'joao@email.com', phone: '(11) 99999-9999' })
        expect(result.success).toBe(true)
    })

    it('rejects empty email', () => {
        const result = leadStep2Schema.safeParse({ email: '', phone: '(11) 99999-9999' })
        expect(result.success).toBe(false)
        const issue = result.error?.issues.find((i) => i.path.includes('email'))
        expect(issue?.message).toBe('E-mail é obrigatório')
    })

    it('rejects invalid email', () => {
        const result = leadStep2Schema.safeParse({ email: 'not-an-email', phone: '(11) 99999-9999' })
        expect(result.success).toBe(false)
        const issue = result.error?.issues.find((i) => i.path.includes('email'))
        expect(issue?.message).toBe('E-mail inválido')
    })

    it('rejects phone number that is too short', () => {
        const result = leadStep2Schema.safeParse({ email: 'joao@email.com', phone: '(11) 9999' })
        expect(result.success).toBe(false)
        const issue = result.error?.issues.find((i) => i.path.includes('phone'))
        expect(issue?.message).toBe('Telefone inválido')
    })
})
