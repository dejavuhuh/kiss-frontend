import type { ReactNode } from 'react'
import { copyToClipboard } from '@/utils'
import { CheckCircleFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState } from 'react'

interface CopyableTextProps {
  children: ReactNode
  copyText?: string
}

export function CopyableText({ children, copyText }: CopyableTextProps) {
  const [tip, setTip] = useState<ReactNode>('点击复制')

  return (
    <Tooltip title={tip}>
      <span
        className="font-mono hover:underline decoration-dashed cursor-pointer"
        onClick={async () => {
          await copyToClipboard(typeof children === 'string' ? children : copyText ?? '')
          setTip(
            <div className="flex items-center gap-1">
              <CheckCircleFilled className="text-success" />
              已复制
            </div>,
          )
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
