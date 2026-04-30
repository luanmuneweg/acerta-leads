import type { CreateUpdateLeadDto } from '@/features/leads/types/dtos/create-update-lead.dto'
import type { LeadListQueryDto } from '@/features/leads/types/dtos/lead-list-query.dto'
import type { LeadResponseDto } from '@/features/leads/types/dtos/lead-response.dto'
import type { LeadStep1Values } from '@/features/leads/schemas/lead-step1.schema'
import type { LeadStep2Values } from '@/features/leads/schemas/lead-step2.schema'
import type { LeadListFilter } from '@/features/leads/types/lead-list-filter.type'
import { cpfMask } from '@/lib/masks/cpf.mask'
import { phoneMask } from '@/lib/masks/phone.mask'

export class LeadAdapter {
    static defaultFilterValues(search: Partial<LeadListFilter>): LeadListFilter {
        return {
            nome: search.nome ?? '',
            cpf: search.cpf ? cpfMask.mask(search.cpf) : '',
        }
    }

    static toFilterQuery(search: Partial<LeadListFilter>): LeadListQueryDto {
        return {
            nome: search.nome || undefined,
            cpf: search.cpf ? cpfMask.unmask(search.cpf) : undefined,
        }
    }

    static defaultStep1Values(): LeadStep1Values {
        return {
            name: '',
            cpf: '',
            maritalStatus: '',
            spouseName: '',
        }
    }

    static defaultStep2Values(): LeadStep2Values {
        return {
            email: '',
            phone: '',
        }
    }

    static toForm(dto: LeadResponseDto): LeadStep1Values & LeadStep2Values {
        return {
            name: dto.nome,
            cpf: cpfMask.mask(dto.cpf),
            maritalStatus: dto.estadoCivil,
            spouseName: dto.nomeConjuge ?? '',
            email: dto.email,
            phone: phoneMask.mask(dto.telefone),
        }
    }

    static toBackend(form: LeadStep1Values & LeadStep2Values): CreateUpdateLeadDto {
        return {
            nome: form.name,
            cpf: cpfMask.unmask(form.cpf),
            estadoCivil: form.maritalStatus,
            nomeConjuge: form.spouseName || undefined,
            email: form.email,
            telefone: phoneMask.unmask(form.phone),
        }
    }
}
