import ButtonDefault from '@/components/buttons/ButtonDefault'
import InputDefault from '@/components/form/InputDefault'
import SelectDefault from '@/components/form/SelectDefault'
import type { SelectOption } from '@/types/select-option.type'
import { leadStep1Schema } from '@/features/leads/schemas/lead-step1.schema'
import type { LeadStep1Values } from '@/features/leads/schemas/lead-step1.schema'
import { MaritalStatusEnum } from '@/features/leads/types/enums/marital-status.enum'
import { cpfMask } from '@/lib/masks/cpf.mask'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Icon from '@/components/icons/Icon'

type LeadStep1FormProps = {
    defaultValues: LeadStep1Values
    maritalStatusOptions: SelectOption[]
    onAdvance: (data: LeadStep1Values) => void
    onCancel: () => void
}

export default function LeadStep1Form({ defaultValues, maritalStatusOptions, onAdvance, onCancel }: LeadStep1FormProps) {
    const { control, handleSubmit, setValue, reset, clearErrors } = useForm<LeadStep1Values>({
        resolver: zodResolver(leadStep1Schema),
        mode: 'onTouched',
        defaultValues,
    })

    const maritalStatus = useWatch({ control, name: 'maritalStatus' })
    const isMarried = maritalStatus === MaritalStatusEnum.MARRIED

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

    useEffect(() => {
        if (!isMarried) {
            setValue('spouseName', '')
            clearErrors('spouseName')
        }
    }, [isMarried, setValue, clearErrors])

    return (
        <form onSubmit={handleSubmit(onAdvance)} className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
                <Icon name="person-outline" className="text-secondary-base size-6" />
                <p className="text-grey-darker text-xl leading-[1.2] font-semibold">Dados pessoais</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <InputDefault control={control} name="cpf" label="CPF" placeholder="000.000.000-00" required className="flex-1" mask={cpfMask} />
                <InputDefault control={control} name="name" label="Nome do cliente" placeholder="Digite o nome do cliente" required className="flex-1" />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <SelectDefault
                    control={control}
                    name="maritalStatus"
                    label="Estado Civil"
                    placeholder="Selecione o estado civil"
                    options={maritalStatusOptions}
                    required
                    className="flex-1"
                />
                <InputDefault
                    control={control}
                    name="spouseName"
                    label="Nome do cônjuge"
                    placeholder="Digite o nome do cônjuge"
                    disabled={!isMarried}
                    required={isMarried}
                    className="flex-1"
                />
            </div>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
                <ButtonDefault type="button" variant="cancel-outlined" className="w-full sm:w-30" onClick={onCancel}>
                    Cancelar
                </ButtonDefault>
                <ButtonDefault type="submit" variant="contained" className="w-full sm:w-30">
                    Avançar
                </ButtonDefault>
            </div>
        </form>
    )
}
