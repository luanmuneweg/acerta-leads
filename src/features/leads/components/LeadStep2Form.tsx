import ButtonDefault from '@/components/buttons/ButtonDefault'
import InputDefault from '@/components/form/InputDefault'
import { leadStep2Schema } from '@/features/leads/schemas/lead-step2.schema'
import type { LeadStep2Values } from '@/features/leads/schemas/lead-step2.schema'
import { phoneMask } from '@/lib/masks/phone.mask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Icon from '@/components/icons/Icon'

type LeadStep2FormProps = {
    defaultValues: LeadStep2Values
    isEdit: boolean
    isSaving: boolean
    onSubmit: (data: LeadStep2Values) => void
    onBack: () => void
}

export default function LeadStep2Form({ defaultValues, isEdit, isSaving, onSubmit, onBack }: LeadStep2FormProps) {
    const { control, handleSubmit, reset } = useForm<LeadStep2Values>({
        resolver: zodResolver(leadStep2Schema),
        mode: 'onTouched',
        defaultValues,
    })

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
                <Icon name="phone" className="text-secondary-base size-6" />
                <p className="text-grey-darker text-xl leading-[1.2] font-semibold">Contato</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <InputDefault control={control} name="email" label="E-mail" placeholder="Digite o e-mail do cliente" required className="flex-1" />
                <InputDefault control={control} name="phone" label="Telefone" placeholder="(00) 00000-0000" required className="flex-1" mask={phoneMask} />
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
                <ButtonDefault type="button" variant="cancel-outlined" className="w-full sm:w-30" onClick={onBack}>
                    Voltar
                </ButtonDefault>
                <ButtonDefault type="submit" variant="contained" className="w-full sm:w-30" isLoading={isSaving}>
                    {isEdit ? 'Salvar' : 'Cadastrar'}
                </ButtonDefault>
            </div>
        </form>
    )
}
