import type { PermissionView } from '..'
import { api } from '@/api'
import { findTreeNode } from '@/utils/tree'
import { LockOutlined, QuestionCircleOutlined, SafetyOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Checkbox, Empty, Form, Tooltip } from 'antd'

interface BindRolesFormProps {
  row: PermissionView
  permissionTree: PermissionView[]
}

export function BindRolesForm({ row, permissionTree }: BindRolesFormProps) {
  const { id, parentId } = row
  const { data } = useQuery({
    queryKey: ['roles'],
    queryFn: () => api.roleService.list({
      specification: { permissionId: parentId },
    }),
  })

  const shouldDisable = (roleId: number): boolean => {
    const children = findTreeNode(permissionTree, node => node.id === id)?.children
    if (children) {
      for (const child of children) {
        if (child.roles.some(role => role.id === roleId)) {
          return true
        }
      }
    }
    return false
  }

  return (
    <>
      <Form.Item name="roleIds">
        <Checkbox.Group>
          <div className="flex flex-wrap gap-2">
            {data?.map((role) => {
              const disabled = shouldDisable(role.id)
              if (disabled) {
                return (
                  <Tooltip key={role.id} title="下级权限已绑定">
                    <Checkbox value={role.id} disabled>
                      {role.name}
                    </Checkbox>
                  </Tooltip>
                )
              }
              return (
                <Checkbox key={role.id} value={role.id}>
                  {role.name}
                </Checkbox>
              )
            })}
          </div>
        </Checkbox.Group>
      </Form.Item>
      {data?.length === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请先给上级权限绑定角色"
        />
      )}
    </>
  )
}
