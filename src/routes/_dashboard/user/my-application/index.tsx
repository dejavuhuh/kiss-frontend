import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/user/my-application/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/user/my-application/"!</div>
}
