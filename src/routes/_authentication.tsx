import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication')({
  component: AuthenticationLayout,
})

function AuthenticationLayout() {
  return (
    <div className="h-screen flex items-center justify-center bg-layout">
      <Outlet />
    </div>
  )
}
