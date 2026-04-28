import AppHeader from '@/components/layouts/AppHeader'
import RouteLoader from '@/components/loader/RouteLoader'
import { Suspense } from 'react'

type AppLayoutProps = {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen w-full">
            <AppHeader />
            <main>
                <div className="container pt-1.5 pb-10">
                    <Suspense fallback={<RouteLoader />}>{children}</Suspense>
                </div>
            </main>
        </div>
    )
}
