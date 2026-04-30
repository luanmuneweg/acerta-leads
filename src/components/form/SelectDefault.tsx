import { cn } from '@/lib/utils'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import useMediaQuery from '@/hooks/use-media-query'
import type { SelectOption } from '@/types/select-option.type'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'

type SelectDefaultProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    options?: SelectOption[]
    label?: string
    placeholder?: string
    description?: string
    required?: boolean
    disabled?: boolean
    className?: string
}

export default function SelectDefault<T extends FieldValues>({
    control,
    name,
    options = [],
    label,
    placeholder,
    description,
    required,
    disabled,
    className,
}: SelectDefaultProps<T>) {
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const [drawerOpen, setDrawerOpen] = useState(false)

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

                    {isDesktop ? (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            onOpenChange={(open) => {
                                if (!open) field.onBlur()
                            }}
                            disabled={disabled}
                        >
                            <SelectTrigger
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                className={cn('w-full', field.value ? 'text-grey-darker' : 'text-grey-light font-normal')}
                            >
                                <SelectValue placeholder={placeholder}>{options.find((option) => option.value === field.value)?.label}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <>
                            <button
                                type="button"
                                id={field.name}
                                disabled={disabled}
                                data-invalid={fieldState.invalid || undefined}
                                onClick={() => setDrawerOpen(true)}
                                className={cn(
                                    'group border-grey-lighter bg-surface-white flex h-10 w-full cursor-pointer items-center justify-between rounded border pr-0 pl-4 text-base whitespace-nowrap transition-colors outline-none select-none',
                                    'data-invalid:border-error-base',
                                    'disabled:cursor-not-allowed disabled:opacity-50',
                                    !field.value && 'text-grey-light'
                                )}
                            >
                                <span className="text-grey-darker flex-1 text-left">
                                    {options.find((option) => option.value === field.value)?.label ?? placeholder}
                                </span>
                                <div className="border-grey-lighter flex h-full w-10 shrink-0 items-center justify-center border-l">
                                    <ChevronDownIcon className="text-grey-base size-5" />
                                </div>
                            </button>

                            <Drawer
                                open={drawerOpen}
                                onOpenChange={(open) => {
                                    setDrawerOpen(open)
                                    if (!open) field.onBlur()
                                }}
                            >
                                <DrawerContent>
                                    {label && (
                                        <DrawerHeader>
                                            <DrawerTitle>{label}</DrawerTitle>
                                        </DrawerHeader>
                                    )}
                                    <div className="flex flex-col pb-8">
                                        {options.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    field.onChange(option.value)
                                                    setDrawerOpen(false)
                                                }}
                                                className={cn(
                                                    'flex cursor-pointer items-center px-6 py-3.5 text-base transition-colors',
                                                    option.value === field.value ? 'text-primary-base font-semibold' : 'text-grey-darker hover:bg-surface-grey'
                                                )}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </>
                    )}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    {description && <FieldDescription>{description}</FieldDescription>}
                </Field>
            )}
        />
    )
}
