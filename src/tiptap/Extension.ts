import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { S3Image as Component } from './S3Image'

const S3Image = Node.create({
  name: 's3-image',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      bucket: {},
      objectName: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 's3-image',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['s3-image', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})

export { S3Image }
