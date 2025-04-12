import { cn } from '@/utils'
import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'react'

interface MonacoDiffEditorProps {
  className?: string
  language: string
  original?: string
  modified?: string
}

export function MonacoDiffEditor({ className, language, original, modified }: MonacoDiffEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getModel()?.original.setValue(original ?? '')
    }
  }, [original])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getModel()?.modified.setValue(modified ?? '')
    }
  }, [modified])

  useEffect(() => {
    const originalModel = monaco.editor.createModel(
      original ?? '',
      language,
    )
    const modifiedModel = monaco.editor.createModel(
      modified ?? '',
      language,
    )

    const diffEditor = monaco.editor.createDiffEditor(
      containerRef.current!,
      {
      },
    )
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    })

    editorRef.current = diffEditor
  }, [])

  return <div className={cn('border', className)} ref={containerRef} />
}
