import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { createFileRoute, Link } from '@tanstack/react-router'
import { App, Form, Radio, Space, Table, Typography } from 'antd'

export const Route = createFileRoute('/_dashboard/trace/session/')({
  component: SessionManagement,
})

type SessionView = ResponseOf<typeof api.sessionService.list>[number]

function SessionManagement() {
  const { modal, message } = App.useApp()
  const [form] = Form.useForm<{ id?: number, username?: string, createdTime?: string[] }>()

  const { reload, tableProps } = useTable({
    queryKey: ['sessions'],
    queryFn: () => {
      const { createdTime, ...values } = form.getFieldsValue()
      return api.sessionService.list({
        specification: {
          ...values,
          minCreatedTime: createdTime?.[0],
          maxCreatedTime: createdTime?.[1],
        },
      })
    },
  })

  const columns: TableProps<SessionView>['columns'] = [
    {
      title: '会话ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: ['user', 'username'],
      render(text, { id }) {
        return (
          <Link to="/system/role/$id" params={{ id }}>
            {text}
          </Link>
        )
      },
    },
    {
      title: '失效时间',
      dataIndex: 'expiredTime',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      render(_, { id, ...record }) {
        return (
          <Space>
            <Typography.Link
              type="danger"
              onClick={() => {
                modal.confirm({
                  title: '强制下线',
                  content: (
                    <>
                      确定要强制下线
                      <span className="font-bold text-primary mx-0.5">{record.user.username}</span>
                      用户吗？
                    </>
                  ),
                  okButtonProps: {
                    danger: true,
                  },
                  async onOk() {
                    await api.sessionService.kickOut({ id })
                    message.success('下线成功')
                    reload()
                  },
                })
              }}
            >
              强制下线
            </Typography.Link>
          </Space>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <Radio.Group defaultValue="online" buttonStyle="solid">
        <Radio.Button value="online">在线会话</Radio.Button>
        <Radio.Button value="history">历史会话</Radio.Button>
      </Radio.Group>
      <QueryFilter onFinish={reload} form={form} span={6} defaultCollapsed className="card">
        <ProFormText name="id" label="会话ID" />
        <ProFormText name="username" label="用户名" />
        <ProFormDateTimeRangePicker name="createdTime" label="创建时间" />
      </QueryFilter>
      <div className="card">
        <Table size="small" columns={columns} {...tableProps} />
      </div>
    </div>
  )
}
