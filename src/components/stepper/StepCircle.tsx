import type { Step } from '@/types/step.type'

type StepCircleProps = {
    state: Step['state']
    number: number
}

export default function StepCircle({ state, number }: StepCircleProps) {
    if (state === 'active') {
        return (
            <div className="bg-secondary-base ring-secondary-base flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-offset-2">
                <p className="text-grey-darker text-base leading-[1.2]">{number}</p>
            </div>
        )
    }

    if (state === 'completed') {
        return (
            <div className="bg-success flex h-8 w-8 items-center justify-center rounded-full">
                <p className="text-base leading-[1.2] text-white">{number}</p>
            </div>
        )
    }

    return (
        <div className="border-grey-light flex h-8 w-8 items-center justify-center rounded-full border">
            <p className="text-grey-darker text-base leading-[1.2]">{number}</p>
        </div>
    )
}
