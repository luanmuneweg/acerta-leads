import { z } from 'zod'

export const envVariablesSchema = z.object({
    VITE_API_URL: z.string().min(1),
})
