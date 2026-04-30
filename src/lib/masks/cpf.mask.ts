import type { IMask } from '@/types/utils/mask.interface'

class CpfMask implements IMask {
    mask(value: string): string {
        let formatted = value.replace(/\D/g, '').slice(0, 11)
        formatted = formatted.replace(/^(\d{3})(\d)/, '$1.$2')
        formatted = formatted.replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
        formatted = formatted.replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2')
        return formatted
    }

    unmask(value: string): string {
        return value.replace(/\D/g, '')
    }
}

export const cpfMask = new CpfMask()
