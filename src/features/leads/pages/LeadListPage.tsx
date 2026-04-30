import ButtonDefault from '@/components/buttons/ButtonDefault'
import InputDefault from '@/components/form/InputDefault'
import ConfirmDialog from '@/components/modals/ConfirmDialog'
import TableDefault from '@/components/table/TableDefault'
import { LeadAdapter } from '@/features/leads/adapters/lead.adapter'
import { buildLeadColumns } from '@/features/leads/components/leadColumns'
import { useDeleteLead } from '@/features/leads/hooks/use-delete-lead.hook'
import { useListLeads } from '@/features/leads/hooks/use-list-leads.hook'
import type { LeadResponseDto } from '@/features/leads/types/dtos/lead-response.dto'
import type { LeadListFilter } from '@/features/leads/types/lead-list-filter.type'
import { handleError } from '@/lib/handle-error'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { cpfMask } from '@/lib/masks/cpf.mask'
import Icon from '@/components/icons/Icon'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from '@/lib/toast'

export default function LeadListPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/leads/' })
    const { data: leads = [], isFetching, isError, error } = useListLeads(LeadAdapter.toFilterQuery(search))
    const { mutateAsync: deleteLead, isPending: isDeleting } = useDeleteLead()
    const { control, handleSubmit, reset } = useForm<LeadListFilter>({
        defaultValues: LeadAdapter.defaultFilterValues(search),
    })

    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [leadToDelete, setLeadToDelete] = useState<LeadResponseDto | null>(null)

    const hasFilters = !!(search.nome || search.cpf)
    const columns = useMemo(() => buildLeadColumns({ onEdit, onDeleteRequest }), [])

    useEffect(() => {
        reset(LeadAdapter.defaultFilterValues(search))
    }, [search.nome, search.cpf])

    useEffect(() => {
        if (isError) handleError(error)
    }, [isError])

    function onFilter(data: LeadListFilter) {
        navigate({ to: '/leads', search: LeadAdapter.toFilterQuery(data) })
    }

    function onClear() {
        navigate({ to: '/leads', search: {} })
    }

    function onEdit(lead: LeadResponseDto) {
        navigate({ to: '/leads/$id/edit', params: { id: String(lead.id) } })
    }

    function onDeleteRequest(lead: LeadResponseDto) {
        setLeadToDelete(lead)
        setDeleteModalIsOpen(true)
    }

    async function onDeleteConfirm() {
        if (!leadToDelete) return
        try {
            await deleteLead(leadToDelete.id)
            toast.success('Lead excluído com sucesso!')
            setDeleteModalIsOpen(false)
            setLeadToDelete(null)
        } catch (error) {
            handleError(error)
        }
    }

    function onDeleteCancel() {
        if (isDeleting) return
        setDeleteModalIsOpen(false)
        setLeadToDelete(null)
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="title-base">Consulta de Leads</h1>
                    <ButtonDefault
                        variant="primary-outlined"
                        onClick={() => navigate({ to: '/leads/new' })}
                        icon={<Icon name="add" className="size-6" />}
                        iconPlacement="right"
                        className="w-auto"
                    >
                        Novo Lead
                    </ButtonDefault>
                </div>

                <form onSubmit={handleSubmit(onFilter)}>
                    <section className="page-section flex flex-col gap-4">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <InputDefault control={control} name="cpf" label="CPF" placeholder="Digite o CPF do cliente" className="flex-1" mask={cpfMask} />
                            <InputDefault control={control} name="nome" label="Nome do cliente" placeholder="Digite o nome do cliente" className="flex-1" />
                        </div>
                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-4">
                            <ButtonDefault type="button" variant="primary-outlined" onClick={onClear}>
                                Limpar tudo
                            </ButtonDefault>
                            <ButtonDefault type="submit" variant="contained">
                                Filtrar
                            </ButtonDefault>
                        </div>
                    </section>
                </form>

                <section className="page-section">
                    <TableDefault
                        columns={columns}
                        data={leads}
                        isFetching={isFetching}
                        emptyText={hasFilters ? 'Nenhum lead encontrado' : 'Nenhum lead cadastrado'}
                        mobileHeader="nome"
                    />
                </section>
            </div>

            <ConfirmDialog
                open={deleteModalIsOpen}
                title="Excluir lead"
                description="Tem certeza que deseja excluir este lead? Essa ação não pode ser desfeita."
                isLoading={isDeleting}
                confirmVariant="destructive"
                onConfirm={onDeleteConfirm}
                onCancel={onDeleteCancel}
            />
        </>
    )
}
