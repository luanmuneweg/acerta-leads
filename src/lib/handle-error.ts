import { toast } from '@/lib/toast'
import { AxiosError } from 'axios'

export function handleError(error: unknown) {
    if (error instanceof AxiosError) {
        if (error.code === 'ERR_NETWORK') {
            toast.error('Sem conexão. Verifique sua internet e tente novamente.')
            return
        }
        if (error.response?.status === 500) {
            toast.error('Erro interno do servidor. Tente novamente mais tarde.')
            return
        }
    }
    toast.error('Erro inesperado. Tente novamente mais tarde.')
}
