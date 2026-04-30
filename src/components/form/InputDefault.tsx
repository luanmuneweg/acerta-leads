import { cn } from '@/lib/utils'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import type { IMask } from '@/types/utils/mask.interface'

type InputDefaultProps<T extends FieldValues> = React.ComponentProps<'input'> & {
    control: Control<T>
    name: Path<T>
    label?: string
    description?: string
    mask?: IMask
    required?: boolean
}

export default function InputDefault<T extends FieldValues>({
    control,
    name,
    label,
    description,
    mask,
    required,
    className,
    onChange,
    ...rest
}: InputDefaultProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className={cn('flex flex-col gap-1', className)}>
                    {label && (
                        <FieldLabel htmlFor={field.name}>
                            {label}
                            {required && <span className="text-destructive ml-0.5">*</span>}
                        </FieldLabel>
                    )}
                    <InputGroup>
                        <InputGroupInput
                            {...rest}
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className="pl-0"
                            onChange={(e) => {
                                if (mask) e.target.value = mask.mask(e.target.value)
                                field.onChange(e)
                                onChange?.(e)
                            }}
                        />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    {description && <FieldDescription>{description}</FieldDescription>}
                </Field>
            )}
        />
    )
}
