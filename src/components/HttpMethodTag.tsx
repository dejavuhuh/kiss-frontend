import type { TagProps } from 'antd'
import { Tag } from 'antd'

const methodColors: Record<string, TagProps['color']> = {
  GET: 'green',
  POST: 'blue',
  PUT: 'orange',
  DELETE: 'red',
  PATCH: 'purple',
}

export function HttpMethodTag({ method }: { method: string }) {
  return (
    <Tag color={methodColors[method]} bordered={false} className="font-mono mr-0">{method}</Tag>
  )
}
