import { RichTextEditor } from '@/components/form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/component/rich-text-editor/')(
  {
    component: RichTextEditorComponent,
  },
)

function RichTextEditorComponent() {
  return (
    <div className="card">
      <RichTextEditor bucket="system-error-screenshot" />
    </div>
  )
}
