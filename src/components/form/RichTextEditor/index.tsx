import { api } from '@/api'
import { S3Image } from '@/tiptap/Extension'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'

interface RichTextEditorProps {
  bucket: string
}

export function RichTextEditor({ bucket }: RichTextEditorProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'prose prose-slate prose-sm sm:prose-sm md:prose-sm lg:prose-base rounded-md p-5 border-border border focus:outline-none',
      },
    },
    extensions: [
      Document,
      Heading,
      Paragraph,
      S3Image,
      Text,
      Image,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(async (body) => {
            if (htmlContent) {
              return false
            }

            const objectName = crypto.randomUUID().replace(/-/g, '')
            const method = 'PUT'
            const uploadUrl = await api.s3service.preSignedUrl({
              bucket,
              method,
              objectName,
            })

            await fetch(uploadUrl, {
              method,
              body,
            })

            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
              type: 's3-image',
              attrs: {
                bucket,
                objectName,
              },
            }).focus().run()
          })
        },
      }),
    ],
  })
  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}
