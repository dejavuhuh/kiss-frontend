import api from '@/api'
import { useMenuTree } from '@/rbac/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Tree } from 'antd'
import { useState } from 'react'

interface RoleMenuTreeProps {
  id: number
  onOk: (checkedMenuIds: number[]) => Promise<void>
  onCancel: () => void
}

export default ({ id, onOk, onCancel }: RoleMenuTreeProps) => {
  const queryClient = useQueryClient()
  const { data: treeData } = useMenuTree()
  const queryKey = [`/roles/${id}/menus`]
  const { data: menuIds } = useQuery({
    queryKey,
    queryFn: () => api.roleService.findMenus({ id }),
  })
  const [checkedKeys, setCheckedKeys] = useState<number[]>([])

  if (!treeData || !menuIds) {
    return null
  }

  return (
    <div className="space-y-4">
      <Tree
        checkable
        onCheck={keys => setCheckedKeys(keys as number[])}
        treeData={treeData}
        defaultCheckedKeys={menuIds}
        defaultExpandAll
      />
      <div className="flex justify-end">
        <div className="space-x-2">
          <Button
            color="default"
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={async () => {
              await onOk(checkedKeys)
              await queryClient.invalidateQueries({ queryKey })
              onCancel()
            }}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}
