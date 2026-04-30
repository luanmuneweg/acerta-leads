import AppLayout from '@/components/layouts/AppLayout'
import config from '@/lib/config.json'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'

type RouterContext = {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: Root,
})

function Root() {
    return (
        <>
            <AppLayout>
                <Outlet />
            </AppLayout>
            <Toaster position="top-right" duration={config.toastDuration} />
        </>
    )
}
