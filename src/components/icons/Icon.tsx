import AddIcon from '@/assets/icons/add.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import PersonOutlineIcon from '@/assets/icons/person_outline.svg?react'
import PhoneIcon from '@/assets/icons/phone.svg?react'
import TrashIcon from '@/components/icons/TrashIcon'

const icons = {
    add: AddIcon,
    edit: EditIcon,
    'person-outline': PersonOutlineIcon,
    phone: PhoneIcon,
    trash: TrashIcon,
}

type IconProps = {
    name: keyof typeof icons
    className?: string
}

export default function Icon({ name, className }: IconProps) {
    const Svg = icons[name]
    return <Svg className={className} />
}
