import { copyToClipboard } from '@/utils'
import { Tooltip } from 'antd'
import { useState } from 'react'

interface CopyableTextProps {
  children: string
}

export function CopyableText({ children }: CopyableTextProps) {
  const [tip, setTip] = useState('点击复制')

  return (
    <Tooltip title={tip}>
      <span
        className="font-mono hover:underline decoration-dashed cursor-pointer"
        onClick={async () => {
          await copyToClipboard(children)
          setTip('已复制')
          setTimeout(() => {
            setTip('点击复制')
          }, 1500)
        }}
      >
        {children}
      </span>
    </Tooltip>
  )
}
