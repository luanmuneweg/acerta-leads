import { cpfSchema, validateCpf } from '@/lib/schemas/cpf.schema'
import { describe, expect, it } from 'vitest'

describe('validateCpf', () => {
    it('accepts a valid CPF', () => {
        expect(validateCpf('529.982.247-25')).toBe(true)
    })

    it('rejects CPF with all identical digits', () => {
        expect(validateCpf('111.111.111-11')).toBe(false)
    })

    it('rejects CPF with fewer than 11 digits', () => {
        expect(validateCpf('123.456.789-0')).toBe(false)
    })

    it('rejects CPF with wrong first check digit', () => {
        expect(validateCpf('529.982.247-00')).toBe(false)
    })

    it('rejects CPF with wrong second check digit', () => {
        expect(validateCpf('529.982.247-26')).toBe(false)
    })
})

describe('cpfSchema', () => {
    it('accepts a valid formatted CPF', () => {
        const result = cpfSchema.safeParse('529.982.247-25')
        expect(result.success).toBe(true)
    })

    it('rejects empty CPF', () => {
        const result = cpfSchema.safeParse('')
        expect(result.success).toBe(false)
        expect(result.error?.issues[0].message).toBe('CPF é obrigatório')
    })

    it('rejects unformatted CPF', () => {
        const result = cpfSchema.safeParse('52998224725')
        expect(result.success).toBe(false)
        expect(result.error?.issues[0].message).toMatch(/CPF inválido/)
    })

    it('rejects mathematically invalid CPF', () => {
        const result = cpfSchema.safeParse('111.111.111-11')
        expect(result.success).toBe(false)
    })
})
