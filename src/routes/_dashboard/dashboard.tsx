import { api } from '@/api'
import { traverseTree } from '@/utils/tree'
import { getPermissions } from '@/utils/user'
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Tree, Typography } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const permissions = getPermissions()
  const existingPermissionIds = permissions.map(p => p.id)
  const { message } = App.useApp()
  const [checkedPermissionIds, setCheckedPermissionIds] = useState<number[]>(existingPermissionIds)

  const { data = [] } = useQuery({
    queryKey: ['permissions'],
    queryFn: api.permissionService.list,
  })

  traverseTree(data, (node) => {
    node.disableCheckbox = existingPermissionIds.includes(node.id)
  })

  const createPermissionApplication = useMutation({
    mutationFn: api.permissionApplicationService.create,
    onSuccess() {
      message.success(
        <div className="flex gap-2">
          申请成功，等待管理员审核
          <Typography.Link>查看进度</Typography.Link>
        </div>,
      )
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <ModalForm<{ reason: string }>
          width={500}
          title="申请权限"
          trigger={<Button type="primary" className="ml-auto">申请权限</Button>}
          onFinish={async ({ reason }) => {
            const permissionIds = checkedPermissionIds.filter(id => !existingPermissionIds.includes(id))
            await createPermissionApplication.mutateAsync({ body: { permissionIds, reason } })
            return true
          }}
        >
          <Tree
            checkable
            selectable={false}
            className="my-4"
            defaultExpandAll
            checkStrictly
            checkedKeys={checkedPermissionIds}
            onCheck={({ checked }) => setCheckedPermissionIds(checked as number[])}
            treeData={data}
            fieldNames={{ title: 'name', key: 'id' }}
          />
          <ProFormTextArea label="申请原因" name="reason" rules={[{ required: true }]} />
        </ModalForm>
      </div>
      <div className="card">
        <h1 className="text-2xl">Dashboard</h1>
      </div>
    </div>
  )
}
