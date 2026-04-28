import { Button } from '@/components/ui/button'
import type { LeadResponseDto } from '@/features/leads/types/dtos/lead-response.dto'
import type { ColumnDef } from '@tanstack/react-table'
import EditIcon from '@/components/icons/EditIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import { cpfMask } from '@/lib/masks/cpf.mask'
import { phoneMask } from '@/lib/masks/phone.mask'

type LeadColumnsActions = {
    onEdit: (lead: LeadResponseDto) => void
    onDeleteRequest: (lead: LeadResponseDto) => void
}

export function buildLeadColumns({ onEdit, onDeleteRequest }: LeadColumnsActions): ColumnDef<LeadResponseDto>[] {
    return [
        {
            accessorKey: 'nome',
            header: 'Nome',
        },
        {
            accessorKey: 'cpf',
            header: 'CPF',
            cell: ({ row }) => cpfMask.mask(row.original.cpf),
        },
        {
            accessorKey: 'email',
            header: 'E-mail',
        },
        {
            accessorKey: 'telefone',
            header: 'Telefone',
            cell: ({ row }) => phoneMask.mask(row.original.telefone),
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        onClick={() => onEdit(row.original)}
                        className="text-grey-base hover:bg-primary-base/10 hover:text-primary-base size-8 rounded border-0 bg-transparent p-0 shadow-none"
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        onClick={() => onDeleteRequest(row.original)}
                        className="text-grey-base size-8 rounded border-0 bg-transparent p-0 shadow-none hover:bg-red-50 hover:text-red-500"
                    >
                        <TrashIcon />
                    </Button>
                </div>
            ),
        },
    ]
}
