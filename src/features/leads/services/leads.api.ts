import { api } from '@/services/api/api'
import type { CreateUpdateLeadDto } from '@/features/leads/types/dtos/create-update-lead.dto'
import type { LeadListQueryDto } from '@/features/leads/types/dtos/lead-list-query.dto'
import type { MaritalStatusResponseDto } from '@/features/leads/types/dtos/marital-status-response.dto'
import type { LeadResponseDto } from '@/features/leads/types/dtos/lead-response.dto'

export class LeadsApi {
    static async list(query?: LeadListQueryDto): Promise<LeadResponseDto[]> {
        const { data } = await api.get('/leads', { params: query })
        return data
    }

    static async getById(id: string): Promise<LeadResponseDto> {
        const { data } = await api.get(`/leads/${id}`)
        return data
    }

    static async create(body: CreateUpdateLeadDto): Promise<LeadResponseDto> {
        const { data } = await api.post('/leads', body)
        return data
    }

    static async update(id: string, body: CreateUpdateLeadDto): Promise<LeadResponseDto> {
        const { data } = await api.put(`/leads/${id}`, body)
        return data
    }

    static async delete(id: string): Promise<void> {
        await api.delete(`/leads/${id}`)
    }

    static async listMaritalStatuses(): Promise<MaritalStatusResponseDto[]> {
        const { data } = await api.get('/estadosCivis')
        return data
    }
}
