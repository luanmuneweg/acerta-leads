import { cpfSchema } from '@/lib/schemas/cpf.schema'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { z } from 'zod'

export const leadStep1Schema = z
    .object({
        name: z.string().min(1, 'Nome é obrigatório'),
        cpf: cpfSchema,
        maritalStatus: z.union([z.enum(MaritalStatusEnum), z.literal('')]),
        spouseName: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.maritalStatus) {
            ctx.addIssue({
                code: 'custom',
                message: 'Estado civil é obrigatório',
                path: ['maritalStatus'],
            })
        }
        if (data.maritalStatus === MaritalStatusEnum.MARRIED && !data.spouseName?.trim()) {
            ctx.addIssue({
                code: 'custom',
                message: 'Nome do cônjuge é obrigatório',
                path: ['spouseName'],
            })
        }
    })

export type LeadStep1Values = z.infer<typeof leadStep1Schema>
