import { LeadsApi } from '@/features/leads/services/leads.api'
import type { CreateUpdateLeadDto } from '@/features/leads/types/dtos/create-update-lead.dto'
import { QueryKey } from '@/types/enums/query-key.enum'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UpdateLeadParams = {
    id: string
    body: CreateUpdateLeadDto
}

export function useUpdateLead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, body }: UpdateLeadParams) => LeadsApi.update(id, body),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.LIST_LEADS] })
            queryClient.invalidateQueries({ queryKey: [QueryKey.GET_LEAD, id] })
        },
    })
}
