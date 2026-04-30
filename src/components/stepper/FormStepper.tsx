import { cn } from '@/lib/utils'
import type { Step } from '@/types/step.type'
import StepCircle from './StepCircle'

type FormStepperProps = {
    steps: Step[]
    className?: string
}

export default function FormStepper({ steps, className }: FormStepperProps) {
    return (
        <div className={cn('relative flex w-full max-w-130 flex-row items-center justify-between', className)}>
            {steps.map((step, index) => (
                <div key={index} className="z-10 flex w-35 flex-col items-center gap-1">
                    <div className="flex h-10 w-10 items-center justify-center">
                        <StepCircle state={step.state} number={index + 1} />
                    </div>
                    <span className="text-grey-dark w-full text-center text-sm leading-[1.4]">{step.label}</span>
                </div>
            ))}

            <div className="border-grey-lighter absolute top-5 right-28 left-28 border-t" />
        </div>
    )
}
