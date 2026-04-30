import type { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'

export type LeadResponseDto = {
    id: string
    nome: string
    cpf: string
    estadoCivil: MaritalStatusEnum
    nomeConjuge: string | undefined
    email: string
    telefone: string
}
