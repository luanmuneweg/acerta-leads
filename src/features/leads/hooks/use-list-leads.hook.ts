import { LeadsApi } from '@/features/leads/services/leads.api'
import type { LeadListQueryDto } from '@/features/leads/types/dtos/lead-list-query.dto'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useQuery } from '@tanstack/react-query'

export function useListLeads(query?: LeadListQueryDto) {
    return useQuery({
        queryKey: [QueryKey.LIST_LEADS, query],
        queryFn: () => LeadsApi.list(query),
    })
}
