import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/trace/session/')({
  component: SessionManagement,
})

function SessionManagement() {
  return <div className="card">会话管理</div>
}
