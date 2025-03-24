import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Table } from 'antd'

export const Route = createFileRoute('/_dashboard/system/user/')({
  component: UserManagement,
})

type UserView = ResponseOf<typeof api.userService.list>['rows'][number]

function UserManagement() {
  const [form] = Form.useForm<{ username?: string, createdTime?: string[] }>()

  const {
    reload,
    tableProps,
  } = useTable({
    queryKey: 'users',
    queryFn: ({ pageIndex, pageSize }) => {
      const { username, createdTime } = form.getFieldsValue()
      return api.userService.list({
        pageIndex,
        pageSize,
        specification: {
          username,
          minCreatedTime: createdTime?.[0],
          maxCreatedTime: createdTime?.[1],
        },
      })
    },
  })

  const columns: TableProps<UserView>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      render() {
        return (
          <>
            <Button
              color="primary"
              size="small"
              variant="link"
            >
              编辑
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <QueryFilter onFinish={reload} form={form} span={8} defaultCollapsed className="card">
        <ProFormText name="username" label="用户名" />
        <ProFormDateTimeRangePicker name="createdTime" label="创建时间" />
      </QueryFilter>
      <div className="card">
        <Table size="small" columns={columns} {...tableProps} />
      </div>
    </div>
  )
}
