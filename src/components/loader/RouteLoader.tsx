import Loader from '@/components/loader/Loader'

export default function RouteLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader variant="dark" className="h-8 w-8" />
        </div>
    )
}
