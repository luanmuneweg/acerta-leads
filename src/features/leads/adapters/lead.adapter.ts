import type { LeadListQueryDto } from '@/features/leads/types/dtos/lead-list-query.dto'
import type { LeadListFilter } from '@/features/leads/types/lead-list-filter.type'
import { cpfMask } from '@/lib/masks/cpf.mask'

export class LeadAdapter {
    static defaultValues(search: Partial<LeadListFilter>): LeadListFilter {
        return {
            nome: search.nome ?? '',
            cpf: search.cpf ? cpfMask.mask(search.cpf) : '',
        }
    }

    static toQuery(search: Partial<LeadListFilter>): LeadListQueryDto {
        return {
            nome: search.nome || undefined,
            cpf: search.cpf ? cpfMask.unmask(search.cpf) : undefined,
        }
    }
}
