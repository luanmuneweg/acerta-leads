import LeadListPage from '@/features/leads/pages/LeadListPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LeadListPage />
}
