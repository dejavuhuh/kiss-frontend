import { createFileRoute } from '@tanstack/react-router'
import { Button, Result } from 'antd'

export const Route = createFileRoute('/_dashboard/403')({
  component: ForbiddenPage,
})

function ForbiddenPage() {
  return (
    <Result
      className="mt-6"
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问该页面"
      extra={<Button type="primary">申请权限</Button>}
    />
  )
}
