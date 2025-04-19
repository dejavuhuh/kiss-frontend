import { cn } from '@/utils'
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useEffect, useRef } from 'react'

// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new JsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new CssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new HtmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new TsWorker()
    }
    return new EditorWorker()
  },
}

interface MonacoEditorProps {
  language: string
  value?: string
  onChange?: (value?: string) => void
  className?: string
  tabSize?: number
}

export function MonacoEditor({ language, value, onChange, className, tabSize = 4 }: MonacoEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(value ?? '')
    }
  }, [value])

  useEffect(() => {
    const editor = monaco.editor.create(containerRef.current!, {
      value,
      language,
      automaticLayout: true,
      tabSize,
    })

    editor.onDidChangeModelContent(() => {
      const newValue = editor.getValue()
      onChange?.(newValue === '' ? undefined : newValue)
    })

    editorRef.current = editor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn('border', className)} ref={containerRef} />
  )
}
