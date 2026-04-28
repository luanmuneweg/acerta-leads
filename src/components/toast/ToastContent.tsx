import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

type ToastContentProps = {
    type: 'success' | 'error'
    message: string
    duration?: number
}

export function ToastContent({ type, message, duration = 4000 }: ToastContentProps) {
    const [progress, setProgress] = useState(100)

    const config = {
        success: {
            bg: 'bg-success-lighter',
            progressBg: 'bg-success-lighter',
            progressFill: 'bg-success-base',
            icon: CheckCircle2,
            iconColor: 'text-success-base',
        },
        error: {
            bg: 'bg-error-lighter',
            progressBg: 'bg-error-lighter',
            progressFill: 'bg-error-base',
            icon: XCircle,
            iconColor: 'text-error-base',
        },
    }

    const { bg, progressBg, progressFill, icon: Icon, iconColor } = config[type]

    useEffect(() => {
        const timeout = setTimeout(() => setProgress(0), 10)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <div className="flex w-25 flex-col shadow-[0px_6px_12px_rgba(0,0,0,0.08)]">
            <div className={cn('flex items-center gap-2 rounded-t px-4 py-4', bg)}>
                <Icon className={cn('size-6 shrink-0', iconColor)} />
                <span className="text-grey-darker text-base leading-[1.2] font-normal">{message}</span>
            </div>
            <div className={cn('h-2 w-full overflow-hidden rounded-b', progressBg)}>
                <div className={cn('h-full rounded-bl', progressFill)} style={{ width: `${progress}%`, transition: `width ${duration}ms linear` }} />
            </div>
        </div>
    )
}
