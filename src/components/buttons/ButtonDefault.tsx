import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import Loader from '@/components/loader/Loader'
import type { VariantProps } from 'class-variance-authority'
import type { Button as ButtonPrimitive } from '@base-ui/react/button'

type ButtonDefaultProps = ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants> & {
        icon?: React.ReactNode
        iconPlacement?: 'left' | 'right'
        isLoading?: boolean
    }

export default function ButtonDefault({ icon, iconPlacement = 'left', isLoading, children, className, variant, ...props }: ButtonDefaultProps) {
    const iconSlot = isLoading ? <Loader className="size-4" /> : icon

    return (
        <Button variant={variant} className={cn('w-full sm:w-auto', iconSlot && 'gap-2', className)} disabled={isLoading || props.disabled} {...props}>
            {iconPlacement === 'left' && iconSlot}
            {children}
            {iconPlacement === 'right' && iconSlot}
        </Button>
    )
}
