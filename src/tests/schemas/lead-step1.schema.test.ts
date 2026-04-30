import { leadStep1Schema } from '@/features/leads/schemas/lead-step1.schema'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { describe, expect, it } from 'vitest'

const validBase = {
    name: 'João Silva',
    cpf: '529.982.247-25',
    maritalStatus: MaritalStatusEnum.SINGLE,
    spouseName: '',
}

describe('leadStep1Schema', () => {
    it('accepts valid data for single marital status', () => {
        const result = leadStep1Schema.safeParse(validBase)
        expect(result.success).toBe(true)
    })

    it('rejects empty name', () => {
        const result = leadStep1Schema.safeParse({ ...validBase, name: '' })
        expect(result.success).toBe(false)
        expect(result.error?.issues[0].path).toContain('name')
    })

    it('rejects empty marital status', () => {
        const result = leadStep1Schema.safeParse({ ...validBase, maritalStatus: '' })
        expect(result.success).toBe(false)
        const issue = result.error?.issues.find((i) => i.path.includes('maritalStatus'))
        expect(issue?.message).toBe('Estado civil é obrigatório')
    })

    it('rejects invalid marital status value', () => {
        const result = leadStep1Schema.safeParse({ ...validBase, maritalStatus: 'invalid' })
        expect(result.success).toBe(false)
    })

    it('rejects married status without spouse name', () => {
        const result = leadStep1Schema.safeParse({
            ...validBase,
            maritalStatus: MaritalStatusEnum.MARRIED,
            spouseName: '',
        })
        expect(result.success).toBe(false)
        expect(result.error?.issues).toEqual([expect.objectContaining({ path: ['spouseName'], message: 'Nome do cônjuge é obrigatório' })])
    })

    it('accepts married status with spouse name', () => {
        const result = leadStep1Schema.safeParse({
            ...validBase,
            maritalStatus: MaritalStatusEnum.MARRIED,
            spouseName: 'Maria Silva',
        })
        expect(result.success).toBe(true)
    })

    it('does not require spouse name for other marital statuses', () => {
        for (const status of [MaritalStatusEnum.WIDOWED, MaritalStatusEnum.SEPARATED]) {
            const result = leadStep1Schema.safeParse({ ...validBase, maritalStatus: status, spouseName: '' })
            expect(result.success).toBe(true)
        }
    })
})
