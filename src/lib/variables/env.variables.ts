import { envVariablesSchema } from '@/lib/schemas/system/env-variables.schema'

export const envVariables = envVariablesSchema.parse(import.meta.env)
