import { LeadsApi } from '@/features/leads/services/leads.api'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useDeleteLead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => LeadsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_LEADS] })
        },
    })
}
