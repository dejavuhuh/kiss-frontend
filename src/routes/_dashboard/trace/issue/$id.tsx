import type { HttpRequest } from '@/api/__generated/model/static'
import type { TagProps } from 'antd'
import { api } from '@/api'
import { CopyableText, MonacoEditor } from '@/components'
import { RichTextEditor } from '@/components/form'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Segmented, Table, Tag, Typography } from 'antd'
import { useState } from 'react'

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
  const [tab, setTab] = useState<'query' | 'body' | 'headers' | 'curl'>('query')

  return (
    <ProCard
      tabs={{
        defaultActiveKey: 'detail',
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
              <div className="flex flex-col gap-4 mt-1.5">
                <Typography.Title level={5} className="mb-0">请求地址</Typography.Title>
                <div className="flex items-center gap-2.5">
                  <Tag color={methodColors[method]} bordered={false} className="font-mono mr-0">{method}</Tag>
                  <CopyableText>{data.request.url}</CopyableText>
                </div>
                <ProDescriptions column={1} className="pl-0.5">
                  <ProDescriptions.Item label="Trace ID">
                    <CopyableText>{data.traceId}</CopyableText>
                  </ProDescriptions.Item>
                </ProDescriptions>
                <Segmented<typeof tab>
                  value={tab}
                  className="w-fit"
                  onChange={setTab}
                  options={[
                    {
                      label: '查询参数',
                      value: 'query',
                    },
                    {
                      label: '请求体',
                      value: 'body',
                    },
                    {
                      label: (
                        <div className="flex items-center gap-1">
                          请求头
                          <div className="text-xs bg-gray-200/50 px-1 py rounded-lg text-success">{Object.keys(data.request.headers).length}</div>
                        </div>
                      ),
                      value: 'headers',
                    },
                    {
                      label: 'cURL',
                      value: 'curl',
                    },
                  ]}
                />

                {tab === 'query' && (
                  <Table
                    size="small"
                    bordered
                    pagination={false}
                    columns={[
                      {
                        title: '参数名',
                        dataIndex: 'key',
                        render: key => <CopyableText>{key}</CopyableText>,
                      },
                      {
                        title: '参数值',
                        dataIndex: 'value',
                        render: value => <CopyableText>{value}</CopyableText>,
                      },
                    ]}
                    dataSource={Object.entries(data.request.query).map(([key, value]) => ({ key, value }))}
                  />
                )}

                {tab === 'body' && data.request.body && (
                  <MonacoEditor language="json" className="h-96" value={JSON.stringify(JSON.parse(data.request.body), null, '\t')} />
                )}

                {tab === 'headers' && (
                  <Table
                    size="small"
                    bordered
                    rowClassName={(_record, index) => (index % 2 === 1 ? 'bg-gray-50' : '')}
                    pagination={false}
                    columns={[
                      {
                        title: '参数名',
                        dataIndex: 'key',
                        render: key => <CopyableText>{key}</CopyableText>,
                      },
                      {
                        title: '参数值',
                        dataIndex: 'value',
                        render: value => <CopyableText>{value}</CopyableText>,
                      },
                    ]}
                    dataSource={Object.entries(data.request.headers).map(([key, value]) => ({ key, value }))}
                  />
                )}

                {tab === 'curl' && (
                  <MonacoEditor
                    language="shell"
                    className="h-96"
                    value={toCURL(data.request)}
                  />
                )}
              </div>
            ),
          },
        ],
      }}
    />
  )
}

function toCURL(request: HttpRequest): string {
  // Start with the basic curl command and URL
  let curlCommand = `curl '${request.url}'`

  // Add method if not GET
  if (request.method !== 'GET') {
    curlCommand += ` \\
  -X ${request.method}`
  }

  // Add headers
  for (const [key, value] of Object.entries(request.headers)) {
    curlCommand += ` \\
  -H '${key}: ${value}'`
  }

  // Add request body if it exists
  if (request.body) {
    curlCommand += ` \\
  --data-raw '${request.body}'`
  }

  return curlCommand
}
