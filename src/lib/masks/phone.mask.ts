import type { IMask } from '@/types/utils/mask.interface'

class PhoneMask implements IMask {
    mask(value: string): string {
        let formatted = value.replace(/\D/g, '').slice(0, 11)
        formatted = formatted.replace(/^(\d{2})(\d)/, '($1) $2')
        formatted = formatted.replace(/(\d{4,5})(\d{4})$/, '$1-$2')
        return formatted
    }

    unmask(value: string): string {
        return value.replace(/\D/g, '')
    }
}

export const phoneMask = new PhoneMask()
