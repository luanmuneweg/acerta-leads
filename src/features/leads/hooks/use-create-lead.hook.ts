import { LeadsApi } from '@/features/leads/services/leads.api'
import type { CreateUpdateLeadDto } from '@/features/leads/types/dtos/create-update-lead.dto'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateLead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: CreateUpdateLeadDto) => LeadsApi.create(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_LEADS] })
        },
    })
}
