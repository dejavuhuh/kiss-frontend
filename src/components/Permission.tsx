import type { ReactNode } from 'react'
import { hasPermission } from '@/utils/user'

interface PermissionProps {
  code: string
  children: ReactNode
}

export function Permission({ code, children, ...props }: PermissionProps) {
  if (!hasPermission(code)) {
    return null
  }

  return <div {...props}>{children}</div>
}
