import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { ModalForm, ProFormCheckbox, ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Space, Table, Typography } from 'antd'

const { Link } = Typography
export const Route = createFileRoute('/_dashboard/system/user/')({
  component: UserManagement,
})

export type UserView = ResponseOf<typeof api.userService.list>['rows'][number]

function UserManagement() {
  const [form] = Form.useForm<{ username?: string, createdTime?: string[] }>()

  const {
    tableProps,
    reload,
  } = useTable({
    queryKey: ['users'],
    queryFn: () => {
      const { username, createdTime } = form.getFieldsValue()
      return api.userService.list({
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
          <Space>
            <ModalForm<{ roleIds: number[] }>
              width={600}
              title="绑定角色"
              // initialValues={{
              //   roleIds: record.roles.map(role => role.id),
              // }}
              onFinish={async ({ roleIds }) => {
                // await bindRoles.mutateAsync({ id, body: roleIds })
                return true
              }}
              isKeyPressSubmit
              modalProps={{ destroyOnClose: true }}
              trigger={<Link>绑定角色</Link>}
            >
              <ProFormCheckbox>

              </ProFormCheckbox>
            </ModalForm>
          </Space>
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
