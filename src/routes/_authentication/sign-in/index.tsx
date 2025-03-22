import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authentication/sign-in/"!</div>
}
