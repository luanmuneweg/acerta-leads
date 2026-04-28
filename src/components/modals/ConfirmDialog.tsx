import ButtonDefault from '@/components/buttons/ButtonDefault'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

type ConfirmDialogProps = {
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => Promise<void>
    onCancel: () => void
}

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleConfirm() {
        setIsLoading(true)
        try {
            await onConfirm()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="m-0 border-0 bg-transparent p-0">
                    <ButtonDefault variant="cancel-outlined" onClick={onCancel} disabled={isLoading}>
                        {cancelLabel}
                    </ButtonDefault>
                    <ButtonDefault variant="destructive" isLoading={isLoading} onClick={handleConfirm}>
                        {confirmLabel}
                    </ButtonDefault>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
