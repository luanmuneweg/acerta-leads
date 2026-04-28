import { api } from '@/services/api/api'
import type { LeadListQueryDto } from '@/features/leads/types/dtos/lead-list-query.dto'
import type { LeadResponseDto } from '@/features/leads/types/dtos/lead-response.dto'

export class LeadsApi {
    static async list(query?: LeadListQueryDto): Promise<LeadResponseDto[]> {
        const { data } = await api.get('/leads', { params: query })
        return data
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/leads/${id}`)
    }
}
