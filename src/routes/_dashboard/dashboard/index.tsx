import { createFileRoute } from '@tanstack/react-router'
import { ApplyPermissionButton } from './components'

export const Route = createFileRoute('/_dashboard/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex">
        <ApplyPermissionButton />
      </div> */}
      <div className="card">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
    </div>
  )
}
