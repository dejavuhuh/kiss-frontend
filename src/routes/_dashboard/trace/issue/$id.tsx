import type { TagProps } from 'antd'
import { api } from '@/api'
import { CopyableText } from '@/components'
import { RichTextEditor } from '@/components/form'
import { copyToClipboard } from '@/utils'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Table, Tag, Tooltip, Typography } from 'antd'

export const Route = createFileRoute('/_dashboard/trace/issue/$id')({
  component: RouteComponent,
  params: {
    parse: ({ id }) => ({ id } as unknown as { id: number }),
  },
})

const methodColors: Record<string, TagProps['color']> = {
  GET: 'green',
  POST: 'blue',
  PUT: 'orange',
  DELETE: 'red',
  PATCH: 'purple',
}

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseQuery({
    queryKey: ['issues', id],
    queryFn: () => api.issueService.get({ id }),
  })

  const { method } = data.request
  const { message } = App.useApp()

  return (
    <ProCard
      tabs={{
        defaultActiveKey: 'request',
        items: [
          {
            label: '问题详情',
            key: 'detail',
            children: (
              <>
                <div className="flex items-end gap-4 mt-4 mb-6">
                  <Typography.Title level={3} className="mb-0">{data.title}</Typography.Title>
                  <div className="text-secondary text-base space-x-1">
                    <UserOutlined />
                    <span>{data.creator.username}</span>
                  </div>
                  <div className="text-secondary text-base space-x-1">
                    <ClockCircleOutlined />
                    <span>{new Date(data.createdTime).toLocaleString()}</span>
                  </div>
                </div>
                <RichTextEditor value={data.description} readonly bucket="system-error-screenshot" />
              </>
            ),
          },
          {
            label: '请求信息',
            key: 'request',
            children: (
              <div className="space-y-4 mt-1.5">
                <Typography.Title level={5}>请求地址</Typography.Title>
                <div className="flex items-center gap-2.5">
                  <Tag color={methodColors[method]} bordered={false} className="font-mono mr-0">{method}</Tag>
                  <CopyableText>{data.request.url}</CopyableText>
                </div>
                <ProDescriptions column={1}>
                  <ProDescriptions.Item label="Trace ID">
                    <CopyableText>{data.traceId}</CopyableText>
                  </ProDescriptions.Item>
                </ProDescriptions>
                <Typography.Title level={5}>查询参数</Typography.Title>
                <Table
                  size="small"
                  bordered
                  pagination={false}
                  columns={[
                    {
                      title: '参数名',
                      dataIndex: 'key',
                    },
                    {
                      title: '参数值',
                      dataIndex: 'value',
                    },
                  ]}
                  dataSource={Object.entries(data.request.query).map(([key, value]) => ({ key, value }))}
                />
                <Typography.Title level={5}>请求头</Typography.Title>
                <Table
                  size="small"
                  bordered
                  rowClassName={(_record, index) => (index % 2 === 1 ? 'bg-gray-50' : '')}
                  pagination={false}
                  columns={[
                    {
                      title: '参数名',
                      dataIndex: 'key',
                    },
                    {
                      title: '参数值',
                      dataIndex: 'value',
                    },
                  ]}
                  dataSource={Object.entries(data.request.headers).map(([key, value]) => ({ key, value }))}
                />
              </div>
            ),
          },
        ],
      }}
    />
  )
}
