import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import type { Key } from 'react'
import { api } from '@/api'
import { DownloadOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDateTimeRangePicker, ProFormText, ProFormTextArea, QueryFilter } from '@ant-design/pro-components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Form, Space, Table, Typography } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/system/roles/')({
  component: RolesManagement,
})

type RoleView = ResponseOf<typeof api.roleService.list>['rows'][number]
type RoleInput = RequestOf<typeof api.roleService.create>['body']

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '7',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '8',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '9',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '10',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '11',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '12',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

function RolesManagement() {
  const { modal, message } = App.useApp()
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [form] = Form.useForm()
  const [pageIndex, setPageIndex] = useState(0)

  const { refetch, data } = useQuery({
    queryKey: ['roles', pageIndex],
    queryFn: () => api.roleService.list({
      pageIndex,
      specification: form.getFieldsValue(),
    }),
  })

  const query = () => {
    if (pageIndex !== 0) {
      setPageIndex(0)
    }
    else {
      refetch()
    }
  }

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
      dataIndex: 'createdAt',
      render: value => new Date(value).toLocaleString(),
    },
    {
      title: '操作',
      render(_, { id }) {
        return (
          <>
            <Button color="primary" size="small" variant="link">编辑</Button>
            <Button color="primary" size="small" variant="link">详情</Button>
            <Button
              color="danger"
              size="small"
              variant="link"
              danger
              onClick={() => {
                modal.confirm({
                  title: '删除角色',
                  content: '确定删除该角色吗？',
                  okButtonProps: {
                    danger: true,
                  },
                  onOk() {
                    return api.roleService.delete({ id })
                  },
                  afterClose() {
                    message.success('删除成功')
                    query()
                  },
                })
              }}
            >
              删除
            </Button>
          </>
        )
      },
    },
  ]

  const createRole = useMutation({
    mutationFn: api.roleService.create,
  })

  return (
    <div className="flex flex-col gap-4">
      <QueryFilter onFinish={query} form={form} span={8} defaultCollapsed className="card">
        <ProFormText name="name" label="角色名称" />
        <ProFormDateTimeRangePicker name="createdAt" label="创建时间" />
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
                    onOk() {
                      return api.roleService.deleteBatch({ ids: selectedRowKeys as number[] })
                    },
                    okButtonProps: {
                      danger: true,
                    },
                    afterClose() {
                      setSelectedRowKeys([])
                      message.success('删除成功')
                      query()
                    },
                  })
                }}
              >
                批量删除
                <div className="text-xs text-error bg-error-filled min-w-[18px] py-[0.5px] rounded">{selectedRowKeys.length}</div>
              </Button>
            )}
            <Button>操作日志</Button>
            <Button iconPosition="end" icon={<DownloadOutlined />}>导出数据</Button>
            <ModalForm<RoleInput>
              title="创建角色"
              width={500}
              onFinish={async (body) => {
                await createRole.mutateAsync({ body })
                query()
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
          <Table<RoleView>
            size="small"
            dataSource={data?.rows}
            rowKey={row => row.id}
            columns={columns}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
              columnWidth: 50,
            }}
            pagination={{
              total: data?.totalRowCount,
              onChange: page => setPageIndex(page - 1),
              current: pageIndex + 1,
              showTotal: total => `共 ${total} 条`,
            }}
          />
        </Space>
      </div>
    </div>
  )
}
