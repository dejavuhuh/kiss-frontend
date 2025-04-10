import type { ReactNode } from 'react'
import { getCurrentUser } from '@/utils/user'

interface PermissionProps {
  code: string
  children: ReactNode
}

export function Permission({ code, children, ...props }: PermissionProps) {
  const currentUser = getCurrentUser()
  const permissions = currentUser.roles.flatMap(role => role.permissions)

  if (!permissions.some(permission => permission.code === code)) {
    return null
  }

  return <div {...props}>{children}</div>
}
