import { createFileRoute } from '@tanstack/react-router'
import { Segmented } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/user/my-application/')({
  component: MyApplication,
})

function MyApplication() {
  const [type, setType] = useState<'permission' | 'other'>('permission')

  return (
    <div className="card">
      <Segmented
        value={type}
        onChange={setType}
        options={[
          {
            label: '权限申请',
            value: 'permission',
          },
          {
            label: '其他申请',
            value: 'other',
          },
        ]}
      />
    </div>
  )
}
