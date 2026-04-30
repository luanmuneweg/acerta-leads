import LeadFormPage from '@/features/leads/pages/LeadFormPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leads/new/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <LeadFormPage />
}
