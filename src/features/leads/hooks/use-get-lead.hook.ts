import { LeadsApi } from '@/features/leads/services/leads.api'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useQuery } from '@tanstack/react-query'

export function useGetLead(id: string) {
    return useQuery({
        queryKey: [QueryKey.GET_LEAD, id],
        queryFn: () => LeadsApi.getById(id),
        enabled: !!id,
    })
}
