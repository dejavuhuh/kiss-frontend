import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/trace/issue/')({
  component: IssueFeedback,
})

function IssueFeedback() {
  return <div className="card"></div>
}
