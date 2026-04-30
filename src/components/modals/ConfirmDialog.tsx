import ButtonDefault from '@/components/buttons/ButtonDefault'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type ConfirmDialogProps = {
    open: boolean
    title: string
    description: string
    isLoading?: boolean
    confirmLabel?: string
    cancelLabel?: string
    confirmVariant?: 'destructive' | 'contained' | 'primary-outlined'
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmDialog({
    open,
    title,
    description,
    isLoading = false,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    confirmVariant,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
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
                    <ButtonDefault variant={confirmVariant} isLoading={isLoading} disabled={isLoading} onClick={onConfirm}>
                        {confirmLabel}
                    </ButtonDefault>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
