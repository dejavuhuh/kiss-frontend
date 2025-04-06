import { api } from '@/api'
import { S3Image } from '@/tiptap/Extension'
import { cn } from '@/utils'
import { CodeOutlined, OrderedListOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, Divider, Tooltip, Typography } from 'antd'

interface RichTextEditorProps {
  bucket: string
  value?: string
  onChange?: (value: string | undefined) => void
  className?: string
  placeholder?: string
  readonly?: boolean
}

// Helper component for toolbar buttons
interface ToolbarButtonProps {
  title: string
  icon: React.ReactNode
  onClick: () => void
  active?: boolean
}

function ToolbarButton({ title, icon, onClick, active }: ToolbarButtonProps) {
  const buttonClass = 'text-secondary transition-colors font-medium text-sm'

  return (
    <Tooltip title={title} zIndex={9999}>
      <Button
        className={cn(
          buttonClass,
          active ? 'text-primary bg-bg-text-hover' : 'hover:text-text',
        )}
        icon={icon}
        type="text"
        onClick={onClick}
      />
    </Tooltip>
  )
}

// Helper component for block buttons
interface BlockButtonProps {
  title: string
  icon: React.ReactNode
  onClick: () => void
  active?: boolean
}

function BlockButton({ title, icon, onClick, active }: BlockButtonProps) {
  const buttonClass = 'text-secondary hover:text-text transition-colors font-medium text-sm'

  return (
    <Button
      className={cn(
        'flex items-center justify-start gap-2',
        buttonClass,
        'px-2 py-1.5',
        active && 'text-primary',
      )}
      type="text"
      block
      onClick={onClick}
    >
      {icon}
      <span>{title}</span>
    </Button>
  )
}

export function RichTextEditor({ bucket, value, onChange, className, placeholder = '支持粘贴图片', readonly = false }: RichTextEditorProps) {
  const editor = useEditor({
    editable: !readonly,
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-p:mb-2 prose-p:mt-0 prose-ol:mb-0 prose-h2:mb-4 prose-h3:mb-3 prose-img:mt-0 min-h-full max-w-none rounded-md px-4 py-2 outline-1 outline-border focus:outline-primary',
          className,
          {
            'outline-none': readonly,
          },
        ),
      },
    },
    content: value,
    onUpdate({ editor }) {
      const html = editor.getHTML()
      if (html === '<p></p>') {
        onChange?.(undefined)
      }
      else {
        onChange?.(html)
      }
    },
    extensions: [
      StarterKit,
      S3Image,
      Image,
      Placeholder.configure({
        placeholder,
      }),
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
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'right-start', offset: [30, 0] }}>
          <div className="card p-2 w-fit">
            <Typography.Title level={5} className="text-sm ml-1.5 mt-1.5">通用</Typography.Title>
            <div className="grid grid-cols-6 gap-x-0.5">
              {/* Heading buttons */}
              <ToolbarButton
                title="标题1"
                icon="H1"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
              />
              <ToolbarButton
                title="标题2"
                icon="H2"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
              />
              <ToolbarButton
                title="标题3"
                icon="H3"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor.isActive('heading', { level: 3 })}
              />
              <ToolbarButton
                title="标题4"
                icon="H4"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                active={editor.isActive('heading', { level: 4 })}
              />
              <ToolbarButton
                title="标题5"
                icon="H5"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                active={editor.isActive('heading', { level: 5 })}
              />
              <ToolbarButton
                title="标题6"
                icon="H6"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                active={editor.isActive('heading', { level: 6 })}
              />

              {/* List buttons */}
              <ToolbarButton
                title="有序列表"
                icon={<OrderedListOutlined />}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
              />
              <ToolbarButton
                title="无序列表"
                icon={<UnorderedListOutlined />}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
              />
            </div>
            <Divider className="my-2" />

            {/* Block buttons */}
            <BlockButton
              title="表格"
              icon={<TableOutlined className="mr-1" />}
              onClick={() => {}}
              active={editor.isActive('table')}
            />
            <BlockButton
              title="代码块"
              icon={<CodeOutlined className="mr-1" />}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              active={editor.isActive('codeBlock')}
            />
          </div>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}
