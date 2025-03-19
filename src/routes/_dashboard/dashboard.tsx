import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4 rounded-md bg-container shadow">
      <h1 className="text-2xl">Dashboard</h1>
    </div>
  )
}
