import { RichTextEditor } from '@/components/form'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/component/rich-text-editor/')(
  {
    component: RichTextEditorComponent,
  },
)

function RichTextEditorComponent() {
  const [html, setHtml] = useState(`<p>Hello</p>`)

  return (
    <div className="card space-y-4">
      <RichTextEditor bucket="system-error-screenshot" value={html} onChange={setHtml} />
    </div>
  )
}
