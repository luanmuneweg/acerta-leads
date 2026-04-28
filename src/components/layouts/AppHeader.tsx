import logo from '@/assets/logo.svg'

export default function AppHeader() {
    return (
        <header className="h-22">
            <div className="container flex h-full items-center">
                <img src={logo} alt="Acerta" />
            </div>
        </header>
    )
}
