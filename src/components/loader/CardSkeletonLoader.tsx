import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type CardSkeletonLoaderProps = {
    className?: string
}

export default function CardSkeletonLoader({ className }: CardSkeletonLoaderProps) {
    return <Skeleton className={cn('h-full w-full', className)} />
}
