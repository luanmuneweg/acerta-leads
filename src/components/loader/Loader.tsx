import { cn } from '@/lib/utils'

type LoaderProps = {
    className?: string
    variant?: 'light' | 'dark'
}

export default function Loader({ className, variant = 'light' }: LoaderProps) {
    return (
        <div
            className={cn(
                'h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-current',
                variant === 'dark' && 'text-grey-darker',
                className
            )}
        />
    )
}
