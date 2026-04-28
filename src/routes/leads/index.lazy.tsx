import LeadListPage from '@/features/leads/pages/LeadListPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leads/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LeadListPage />
}
