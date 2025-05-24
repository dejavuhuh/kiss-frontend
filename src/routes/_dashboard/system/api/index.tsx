import { api } from '@/api'
import { createFileRoute } from '@tanstack/react-router'
import { Divider, Tree, Typography } from 'antd'

export const Route = createFileRoute('/_dashboard/system/api/')({
  component: RouteComponent,
  loader({ context: { queryClient } }) {
    return queryClient.ensureQueryData({
      queryKey: ['permissions'],
      queryFn: api.permissionService.list,
    })
  },
})

function RouteComponent() {
  const permissions = Route.useLoaderData()

  return (
    <div className="flex gap-4">
      <div className="card p-0 w-[300px] items-stretch">
        <Typography.Title level={5} className="mb-0 mr-auto px-4 py-2.5 flex items-center">
          <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
          菜单树
        </Typography.Title>
        <Divider className="my-0" />
        <Tree
          className="px-2 py-2.5"
          // @ts-expect-error antd bugs
          treeData={permissions}
          fieldNames={{ title: 'name', key: 'id' }}
        />
      </div>
      <div className="card p-0 flex-1 items-stretch">
        <Typography.Title level={5} className="mb-0 mr-auto px-4 py-2.5 flex items-center">
          <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
          接口列表
        </Typography.Title>
        <Divider className="my-0" />
      </div>
    </div>
  )
}
