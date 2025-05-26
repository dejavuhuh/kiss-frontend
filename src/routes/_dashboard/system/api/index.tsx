import { api } from '@/api'
import { ArrowRightOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Divider, Empty, Tree, Typography } from 'antd'
import { useState } from 'react'
import { ApiList } from './components'

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
  const [selectedKey, setSelectedKey] = useState<number>()

  return (
    <div className="flex gap-4">
      <div className="card p-0 w-[300px]">
        <Typography.Title level={5} className="mb-0 mr-auto px-4 py-2.5 flex items-center">
          <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
          菜单树
        </Typography.Title>
        <Divider className="my-0" />
        <Tree
          className="px-2 py-2.5"
          selectedKeys={selectedKey ? [selectedKey] : []}
          onSelect={selectedKeys => selectedKeys.length ? setSelectedKey(selectedKeys[0] as number) : setSelectedKey(undefined)}
          // @ts-expect-error antd bugs
          treeData={permissions}
          fieldNames={{ title: 'name', key: 'id' }}
        />
      </div>
      <div className="card p-0 flex-1">
        <Typography.Title level={5} className="mb-0 mr-auto px-4 py-2.5 flex items-center">
          <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
          接口列表
        </Typography.Title>
        <Divider className="my-0" />
        {!selectedKey && (
          <div className="px-4 py-2.5 flex justify-center items-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="选中左侧菜单查看接口"
            />
          </div>
        )}
        {selectedKey && <ApiList id={selectedKey} />}
      </div>
    </div>
  )
}
