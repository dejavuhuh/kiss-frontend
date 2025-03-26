import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { getCurrentUser } from '@/utils/user'
import { DownloadOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDateTimeRangePicker, ProFormText, ProFormTextArea, QueryFilter } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Form, Space, Table, Typography } from 'antd'

export const Route = createFileRoute('/_dashboard/system/role/')({
  component: RolesManagement,
})

type RoleView = ResponseOf<typeof api.roleService.page>['rows'][number]
type RoleInput = RequestOf<typeof api.roleService.create>['body']

function RolesManagement() {
  const currentUser = getCurrentUser()

  const { modal, message } = App.useApp()
  const [form] = Form.useForm<{ name?: string, createdTime?: string[] }>()

  const {
    reload,
    selectedRowKeys,
    setSelectedRowKeys,
    tableProps,
  } = useTable({
    queryKey: 'roles',
    queryFn: ({ pageIndex, pageSize }) => {
      const { name, createdTime } = form.getFieldsValue()
      return api.roleService.page({
        pageIndex,
        pageSize,
        specification: {
          name,
          minCreatedTime: createdTime?.[0],
          maxCreatedTime: createdTime?.[1],
        },
      })
    },
  })

  const createRole = useMutation({
    mutationFn: api.roleService.create,
    onSuccess() {
      message.success('创建成功')
      reload()
    },
  })

  const updateRole = useMutation({
    mutationFn: api.roleService.update,
    onSuccess() {
      message.success('编辑成功')
      reload()
    },
  })

  const columns: TableProps<RoleView>['columns'] = [
    {
      title: '角色ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '创建人',
      dataIndex: ['creator', 'username'],
    },
    {
      title: '操作',
      render(_, { id, ...record }) {
        const canEdit = record.creator.id === currentUser.id
        return (
          <>
            {canEdit && (
              <ModalForm<RoleInput>
                title="编辑角色"
                trigger={(
                  <Button
                    color="primary"
                    size="small"
                    variant="link"
                  >
                    编辑
                  </Button>
                )}
                initialValues={record}
                width={500}
                onFinish={async (body) => {
                  await updateRole.mutateAsync({ id, body })
                  return true
                }}
                isKeyPressSubmit
                modalProps={{ destroyOnClose: true }}
              >
                <ProFormText name="name" label="角色名称" rules={[{ required: true }]} />
                <ProFormTextArea name="description" label="角色描述" />
              </ModalForm>
            )}
            <Button color="primary" size="small" variant="link">详情</Button>
            {canEdit && (
              <Button
                color="danger"
                size="small"
                variant="link"
                danger
                onClick={() => {
                  modal.confirm({
                    title: '删除角色',
                    content: <>
                      确定删除
                      <span className="font-bold text-primary mx-0.5">{record.name}</span>
                      角色吗？
                    </>,
                    okButtonProps: {
                      danger: true,
                    },
                    async onOk() {
                      await api.roleService.delete({ id })
                      message.success('删除成功')
                      reload()
                    },
                  })
                }}
              >
                删除
              </Button>
            )}
          </>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <QueryFilter onFinish={reload} form={form} span={8} defaultCollapsed className="card">
        <ProFormText name="name" label="角色名称" />
        <ProFormDateTimeRangePicker name="createdTime" label="创建时间" />
      </QueryFilter>
      <div className="card">
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center gap-2">
            <Typography.Title level={5} className="mb-0 mr-auto">角色列表</Typography.Title>
            {selectedRowKeys.length > 0 && (
              <Button
                danger
                className="gap-1.5"
                onClick={() => {
                  modal.confirm({
                    title: '删除角色',
                    content: (
                      <>
                        <span>确定删除这</span>
                        <Typography.Link className="m-0.5" strong>{selectedRowKeys.length}</Typography.Link>
                        <span>个角色吗？</span>
                      </>
                    ),
                    async onOk() {
                      await api.roleService.deleteBatch({ ids: selectedRowKeys as number[] })
                      setSelectedRowKeys([])
                      message.success('删除成功')
                      reload()
                    },
                    okButtonProps: {
                      danger: true,
                    },
                  })
                }}
              >
                批量删除
                <div className="text-xs text-error bg-error-filled min-w-[18px] py-[0.5px] rounded">{selectedRowKeys.length}</div>
              </Button>
            )}
            <Button>操作日志</Button>
            <Button iconPosition="end" icon={<DownloadOutlined />}>数据导出</Button>
            <ModalForm<RoleInput>
              title="创建角色"
              width={500}
              onFinish={async (body) => {
                await createRole.mutateAsync({ body })
                return true
              }}
              isKeyPressSubmit
              modalProps={{ destroyOnClose: true }}
              trigger={<Button type="primary">创建角色</Button>}
            >
              <ProFormText name="name" label="角色名称" rules={[{ required: true }]} />
              <ProFormTextArea name="description" label="角色描述" />
            </ModalForm>

          </div>
          <Table size="small" columns={columns} {...tableProps} />
        </Space>
      </div>
    </div>
  )
}
