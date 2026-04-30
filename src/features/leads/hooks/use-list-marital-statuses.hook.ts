import { LeadsApi } from '@/features/leads/services/leads.api'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useQuery } from '@tanstack/react-query'

export function useListMaritalStatuses() {
    return useQuery({
        queryKey: [QueryKey.LIST_MARITAL_STATUSES],
        queryFn: () => LeadsApi.listMaritalStatuses(),
        staleTime: Infinity,
    })
}
