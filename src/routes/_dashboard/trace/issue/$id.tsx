import type { HttpRequest } from '@/api/__generated/model/static'
import { api } from '@/api'
import { CopyableText, HttpMethodTag, MonacoEditor } from '@/components'
import { RichTextEditor } from '@/components/form'
import { ClockCircleOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { App, Button, Segmented, Table, Tag, Typography } from 'antd'
import { useState } from 'react'
import { RelatedToIssueButton } from './components'

export const Route = createFileRoute('/_dashboard/trace/issue/$id')({
  component: RouteComponent,
  params: {
    parse: ({ id }) => ({ id } as unknown as { id: number }),
  },
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { message } = App.useApp()
  const [tab, setTab] = useState<'query' | 'body' | 'headers' | 'curl'>('query')

  const { data, refetch } = useQuery({
    queryKey: ['issues', id],
    queryFn: () => api.issueService.get({ id }),
  })

  if (!data) {
    return null
  }

  const { method } = data.request

  return (
    <ProCard
      tabs={{
        defaultActiveKey: 'detail',
        items: [
          {
            label: '问题详情',
            key: 'detail',
            children: (
              <div className="flex mt-3 gap-4">
                <div className="flex-1">
                  <div className="flex items-end gap-4 mb-6">
                    <Typography.Title level={3} className="mb-0">{data.title}</Typography.Title>
                    <div className="text-secondary text-base space-x-1">
                      <UserOutlined />
                      <span>{data.creator.displayName}</span>
                    </div>
                    <div className="text-secondary text-base space-x-1">
                      <ClockCircleOutlined />
                      <span>{new Date(data.createdTime).toLocaleString()}</span>
                    </div>
                  </div>
                  <RichTextEditor value={data.description} readonly bucket="system-error-screenshot" />
                </div>
                <div className="border-r" />
                <div className="w-[300px] space-y-1">
                  <div className="flex items-center gap-2">
                    <Typography.Title level={5} className="mb-0">关联问题</Typography.Title>
                    {!data.relatedTo && data.relatedFrom.length === 0 && <RelatedToIssueButton id={id} />}
                  </div>
                  {data.relatedTo && (
                    <div className="flex items-center w-full justify-between">
                      <Link to="/trace/issue/$id" params={{ id: data.relatedTo.id }}>
                        #
                        {data.relatedTo.id}
                      </Link>
                      <Button
                        onClick={async () => {
                          await api.issueService.unRelate({ id })
                          message.success('取消关联成功')
                          refetch()
                        }}
                        className="text-icon"
                        size="small"
                        type="text"
                        icon={<DeleteOutlined />}
                      />
                    </div>
                  )}
                  {data.relatedFrom.map(({ id }) => (
                    <div key={id} className="flex items-center w-full justify-between">
                      <Link to="/trace/issue/$id" params={{ id }}>
                        #
                        {id}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            label: '请求信息',
            key: 'request',
            children: (
              <div className="flex flex-col gap-4 mt-1.5">
                <div className="flex items-center gap-2.5">
                  <HttpMethodTag method={method} />
                  <CopyableText>{data.request.url}</CopyableText>
                </div>
                <div className="flex items-center gap-2.5">
                  <Tag color="magenta" bordered={false} className="font-mono mr-0">TraceID</Tag>
                  <CopyableText>{data.traceId}</CopyableText>
                </div>
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
