import { ToastContent } from '@/components/toast/ToastContent'
import config from '@/lib/config.json'
import { toast as sonner } from 'sonner'

type ToastType = 'success' | 'error'

function showToast(type: ToastType, message: string) {
    sonner.custom(() => <ToastContent type={type} message={message} duration={config.toastDuration} />, {
        duration: config.toastDuration,
    })
}

export const toast = {
    success: (message: string) => showToast('success', message),
    error: (message: string) => showToast('error', message),
}
