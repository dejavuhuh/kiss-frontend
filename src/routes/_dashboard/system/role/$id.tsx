import { useTable } from '@/hooks/useTable'
import { SecurityScanOutlined, UserOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { createFileRoute } from '@tanstack/react-router'
import { Segmented, TableProps } from 'antd'
import { useState } from 'react'
import { UserView } from '../user'

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
  return (
    <h1>
      RoleUsers with ID:
      {id}
    </h1>
  )
}

function RolePermissions() {
  return <h1>RolePermissions</h1>
}
