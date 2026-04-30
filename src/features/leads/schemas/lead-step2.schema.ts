import { z } from 'zod'

export const leadStep2Schema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    phone: z.string().min(14, 'Telefone inválido'),
})

export type LeadStep2Values = z.infer<typeof leadStep2Schema>
