import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { getCurrentUser } from '@/utils/user'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Checkbox, Form, Space, Table, Tag, Typography } from 'antd'
import { sort, unique } from 'radash'

const { Link } = Typography
export const Route = createFileRoute('/_dashboard/system/user/')({
  component: UserManagement,
})

export type UserView = ResponseOf<typeof api.userService.list>[number]

function UserManagement() {
  const [form] = Form.useForm<{ username?: string, createdTime?: string[] }>()
  const currentUser = getCurrentUser()
  const { message } = App.useApp()

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

  const assignRoles = useMutation({
    mutationFn: api.userService.assignRoles,
    onSuccess() {
      message.success('分配成功')
      reload()
    },
  })

  const columns: TableProps<UserView>['columns'] = [
    {
      title: '用户ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'displayName',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <div className="flex flex-wrap gap-2">
          {roles.map(role => <Tag className="mr-0" key={role.id} bordered={false} color="cyan">{role.name}</Tag>)}
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      render(_, { id, roles }) {
        const assignableRoles = currentUser.roles
        const existingRoles = roles

        const uniqueRoles = unique([...assignableRoles, ...existingRoles], role => role.id)
        const sortedRoles = sort(uniqueRoles, role => role.id)

        return (
          <Space>
            <ModalForm<{ roleIds: number[] }>
              width={600}
              title="分配角色"
              initialValues={{
                roleIds: roles.map(role => role.id),
              }}
              onFinish={async ({ roleIds }) => {
                await assignRoles.mutateAsync({ id, body: roleIds })
                return true
              }}
              isKeyPressSubmit
              modalProps={{ destroyOnClose: true }}
              trigger={(
                <Link className="flex items-center gap-1">
                  <UsergroupAddOutlined />
                  分配角色
                </Link>
              )}
            >
              <Form.Item name="roleIds">
                <Checkbox.Group>
                  <div className="flex flex-wrap gap-2">
                    {sortedRoles.map(role => (
                      <Checkbox key={role.id} value={role.id} disabled={!assignableRoles.some(r => r.id === role.id)}>
                        {role.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
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
