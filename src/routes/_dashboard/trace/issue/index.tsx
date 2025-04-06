import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { usePageableTable } from '@/hooks/usePageableTable'
import { ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { Form, Space, Table } from 'antd'

export const Route = createFileRoute('/_dashboard/trace/issue/')({
  component: IssueFeedback,
})

type IssueView = ResponseOf<typeof api.issueService.list>['rows'][number]

function IssueFeedback() {
  const { tableProps, reload } = usePageableTable({
    queryKey: ['issues'],
    queryFn({ pageIndex, pageSize }) {
      return api.issueService.list({
        pageIndex,
        pageSize,
        specification: {},
      })
    },
  })

  const [form] = Form.useForm<{ title?: string, description?: string, traceId?: string, creatorId?: number, createdTime?: string[] }>()

  const columns: TableProps<IssueView>['columns'] = [
    {
      title: '问题ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      render(text, { id }) {
        return (
          <RouterLink to="/trace/issue/$id" params={{ id }}>
            {text}
          </RouterLink>
        )
      },
    },
    {
      dataIndex: ['creator', 'username'],
      title: '提交人',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: value => new Date(value).toLocaleString(),
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <>
        <QueryFilter onFinish={reload} form={form} span={8} defaultCollapsed className="card">
          <ProFormText name="title" label="标题" />
          <ProFormDateTimeRangePicker name="createdTime" label="创建时间" />
        </QueryFilter>
      </>
      <div className="card">
        <Space direction="vertical" size="middle" className="w-full">
          <Table size="small" columns={columns} {...tableProps} />
        </Space>
      </div>
    </div>
  )
}
