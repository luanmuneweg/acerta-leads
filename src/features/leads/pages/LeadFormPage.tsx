import FormStepper from '@/components/stepper/FormStepper'
import { LeadAdapter } from '@/features/leads/adapters/lead.adapter'
import LeadStep1Form from '@/features/leads/components/LeadStep1Form'
import LeadStep2Form from '@/features/leads/components/LeadStep2Form'
import { useCreateLead } from '@/features/leads/hooks/use-create-lead.hook'
import { useGetLead } from '@/features/leads/hooks/use-get-lead.hook'
import { useListMaritalStatuses } from '@/features/leads/hooks/use-list-marital-statuses.hook'
import { useUpdateLead } from '@/features/leads/hooks/use-update-lead.hook'
import type { LeadStep1Values } from '@/features/leads/schemas/lead-step1.schema'
import type { LeadStep2Values } from '@/features/leads/schemas/lead-step2.schema'
import { handleError } from '@/lib/handle-error'
import { toast } from '@/lib/toast'
import type { Step } from '@/types/step.type'
import { useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

type LeadFormPageProps = {
    id?: string
}

export default function LeadFormPage({ id }: LeadFormPageProps) {
    const isEdit = !!id
    const navigate = useNavigate()
    const [step, setStep] = useState<1 | 2>(1)
    const [step1Data, setStep1Data] = useState<LeadStep1Values>(LeadAdapter.defaultStep1Values())

    const { mutateAsync: createLead, isPending: isCreating } = useCreateLead()
    const { mutateAsync: updateLead, isPending: isUpdating } = useUpdateLead()
    const { data: maritalStatuses = [] } = useListMaritalStatuses()
    const { data: lead } = useGetLead(id ?? '')

    const isSaving = isCreating || isUpdating

    const steps: Step[] = [
        { label: 'Dados pessoais', state: step === 1 ? 'active' : 'completed' },
        { label: 'Contato', state: step === 1 ? 'pending' : 'active' },
    ]

    const maritalStatusOptions = useMemo(() => maritalStatuses.map((ms) => ({ label: ms.nome, value: String(ms.id) })), [maritalStatuses])
    const step1DefaultValues = useMemo(() => (lead ? LeadAdapter.toForm(lead) : step1Data), [lead, step1Data])
    const step2DefaultValues = useMemo(() => (lead ? LeadAdapter.toForm(lead) : LeadAdapter.defaultStep2Values()), [lead])

    function onAdvance(data: LeadStep1Values) {
        setStep1Data(data)
        setStep(2)
    }

    async function handleSubmit(step2Data: LeadStep2Values) {
        const body = LeadAdapter.toBackend({ ...step1Data, ...step2Data })
        try {
            if (isEdit) {
                await updateLead({ id, body })
                toast.success('Lead atualizado com sucesso!')
            } else {
                await createLead(body)
                toast.success('Lead cadastrado com sucesso!')
            }
            navigate({ to: '/leads' })
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex min-h-10 items-center gap-4">
                <h1 className="title-base">{isEdit ? 'Edição de Lead' : 'Cadastro de Lead'}</h1>
            </div>

            <section className="page-section flex flex-col items-center gap-6 sm:gap-4">
                <FormStepper steps={steps} />

                {step === 1 && (
                    <LeadStep1Form
                        defaultValues={step1DefaultValues}
                        maritalStatusOptions={maritalStatusOptions}
                        onAdvance={onAdvance}
                        onCancel={() => navigate({ to: '/leads' })}
                    />
                )}

                {step === 2 && (
                    <LeadStep2Form defaultValues={step2DefaultValues} isEdit={isEdit} isSaving={isSaving} onSubmit={handleSubmit} onBack={() => setStep(1)} />
                )}
            </section>
        </div>
    )
}
