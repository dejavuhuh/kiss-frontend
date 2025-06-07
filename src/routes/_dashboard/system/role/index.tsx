import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import type { Dayjs } from 'dayjs'
import { api } from '@/api'
import { Permission } from '@/components'
import { useTable } from '@/hooks/useTable'
import { formatDateTime } from '@/utils'
import { getCurrentUser } from '@/utils/user'
import { DownloadOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDateTimeRangePicker, ProFormText, ProFormTextArea, QueryFilter } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { App, Button, Form, Space, Table, Typography } from 'antd'
import { utils, writeFile } from 'xlsx'

const { Link } = Typography

export const Route = createFileRoute('/_dashboard/system/role/')({
  component: RolesManagement,
})

type RoleView = ResponseOf<typeof api.roleService.list>[number]
type RoleInput = RequestOf<typeof api.roleService.create>['body']

function RolesManagement() {
  const currentUser = getCurrentUser()

  const { modal, message } = App.useApp()
  const [form] = Form.useForm<{ name?: string, createdTime?: Dayjs[] }>()

  const {
    reload,
    selectedRowKeys,
    setSelectedRowKeys,
    tableProps,
  } = useTable({
    queryKey: ['roles'],
    queryFn: () => {
      const { createdTime, ...values } = form.getFieldsValue()
      return api.roleService.list({
        specification: {
          ...values,
          minCreatedTime: createdTime?.[0].toISOString(),
          maxCreatedTime: createdTime?.[1].toISOString(),
        },
      })
    },
    checkable: row => row.creator.id === currentUser.id,
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
      render(text, { id }) {
        return (
          <RouterLink to="/system/role/$id" params={{ id }}>
            {text}
          </RouterLink>
        )
      },
    },
    {
      title: '角色描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: formatDateTime,
    },
    {
      title: '创建人',
      dataIndex: ['creator', 'displayName'],
    },
    {
      title: '操作',
      render(_, { id, ...record }) {
        const canEdit = record.creator.id === currentUser.id
        return (
          <Space>
            {canEdit && (
              <ModalForm<RoleInput>
                title="编辑角色"
                trigger={<Link color="primary">编辑</Link>}
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
            {canEdit && (
              <Link
                type="danger"
                onClick={() => {
                  modal.confirm({
                    title: '删除角色',
                    content: (
                      <>
                        确定要删除
                        <span className="font-bold text-primary mx-0.5">{record.name}</span>
                        角色吗？
                      </>
                    ),
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
              </Link>
            )}
          </Space>
        )
      },
    },
  ]

  const exportTableDataToExcel = () => {
    const table = document.querySelector('#table table') as HTMLTableElement
    const ws = utils.table_to_sheet(table)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, '角色列表')
    writeFile(wb, '角色列表.xlsx')
  }

  return (
    <div className="flex flex-col gap-4">
      <>
        <QueryFilter onFinish={reload} form={form} span={8} defaultCollapsed className="card">
          <ProFormText name="name" label="角色名称" />
          <ProFormDateTimeRangePicker name="createdTime" label="创建时间" />
        </QueryFilter>
      </>
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
                        <span>确定要删除这</span>
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
            <Button iconPosition="end" onClick={exportTableDataToExcel} icon={<DownloadOutlined />}>数据导出</Button>
            <ModalForm<RoleInput>
              title="创建角色"
              width={500}
              onFinish={async (body) => {
                await createRole.mutateAsync({ body })
                return true
              }}
              isKeyPressSubmit
              modalProps={{ destroyOnClose: true }}
              trigger={(
                <Permission code="system:role:create">
                  <Button type="primary">创建角色</Button>
                </Permission>
              )}
            >
              <ProFormText name="name" label="角色名称" rules={[{ required: true }]} />
              <ProFormTextArea name="description" label="角色描述" />
            </ModalForm>

          </div>
          <Table id="table" size="small" columns={columns} {...tableProps} />
        </Space>
      </div>
    </div>
  )
}
