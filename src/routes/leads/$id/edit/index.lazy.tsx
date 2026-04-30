import LeadFormPage from '@/features/leads/pages/LeadFormPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leads/$id/edit/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()
    return <LeadFormPage id={id} />
}
