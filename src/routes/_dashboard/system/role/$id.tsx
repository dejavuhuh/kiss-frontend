import type { TableProps } from 'antd'
import type { UserView } from '../user'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { formatDateTime } from '@/utils'
import { SecurityScanOutlined, UserOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Segmented, Table } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/system/role/$id')({
  component: RoleDetails,
  params: {
    parse: ({ id }) => ({ id } as unknown as { id: number }),
  },
})

function RoleDetails() {
  const { id } = Route.useParams()
  const [tab, setTab] = useState<'user' | 'permission'>('user')

  return (
    <div className="card space-y-4">
      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          {
            label: '用户',
            icon: <UserOutlined />,
            value: 'user',
          },
          {
            label: '权限',
            icon: <SecurityScanOutlined />,
            value: 'permission',
          },
        ]}
      />
      {tab === 'user' && <RoleUsers id={id} />}
      {tab === 'permission' && <RolePermissions />}
    </div>
  )
}

function RoleUsers({ id }: { id: number }) {
  const { tableProps } = useTable({
    queryKey: ['roles', id, 'users'],
    queryFn: () => api.roleService.users({ id, specification: {} }),
  })

  const columns: TableProps<UserView>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'displayName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: formatDateTime,
    },
  ]

  return (
    <Table columns={columns} {...tableProps} />
  )
}

function RolePermissions() {
  return <h1>RolePermissions</h1>
}
