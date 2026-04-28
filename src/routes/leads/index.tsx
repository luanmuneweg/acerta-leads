import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
    nome: z.string().optional().catch(undefined),
    cpf: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/leads/')({
    validateSearch: searchSchema,
})
