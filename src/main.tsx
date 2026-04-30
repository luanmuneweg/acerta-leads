import '@/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}
