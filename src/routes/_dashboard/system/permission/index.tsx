import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { CopyableText } from '@/components'
import { traverseTree } from '@/utils/tree'
import { ModalForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTreeSelect, QueryFilter } from '@ant-design/pro-components'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Space, Table, Tag, Typography } from 'antd'
import { useMemo } from 'react'
import { BindRolesForm } from './components/BindRolesForm'

const { Link } = Typography

export const Route = createFileRoute('/_dashboard/system/permission/')({
  component: PermissionManagement,
})

type PermissionInput = RequestOf<typeof api.permissionService.create>['body']
export type PermissionView = ResponseOf<typeof api.permissionService.list>[number]

const PermissionTypeNames: Record<PermissionView['type'], string> = {
  DIRECTORY: '目录',
  PAGE: '页面',
  BUTTON: '按钮',
}

const PermissionTypeColors: Record<PermissionView['type'], string> = {
  DIRECTORY: 'blue',
  PAGE: 'geekblue',
  BUTTON: 'purple',
}

function PermissionManagement() {
  const { message, modal } = App.useApp()

  const { data, refetch } = useSuspenseQuery({
    queryKey: ['permissions'],
    queryFn: api.permissionService.list,
  })

  const tree = useMemo(() => {
    // Remove empty children for antd Table
    traverseTree(data, (node) => {
      if (node.children?.length === 0) {
        delete node.children
      }
    })
    // Concat parent code with child code
    return data
  }, [data])

  const createPermission = useMutation({
    mutationFn: api.permissionService.create,
    onSuccess() {
      message.success('创建成功')
      refetch()
    },
  })

  const bindRoles = useMutation({
    mutationFn: api.permissionService.bindRoles,
    onSuccess() {
      message.success('绑定成功')
      refetch()
    },
  })

  const columns: TableProps<PermissionView>['columns'] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      width: 250,
      render: (text, { type }) => (
        <div className="flex items-center">
          <Tag
            bordered={false}
            color={PermissionTypeColors[type]}
          >
            {PermissionTypeNames[type]}
          </Tag>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '可访问角色',
      dataIndex: 'roles',
      width: 400,
      render: (_, { roles }) => (
        <div className="flex flex-wrap gap-2">
          {roles.map(role => <Tag className="mr-0" key={role.id} bordered={false} color="cyan">{role.name}</Tag>)}
        </div>
      ),
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      width: 300,
      render: text => <CopyableText>{text}</CopyableText>,
    },
    {
      title: '操作',
      width: 200,
      render: (_, record) => {
        const { id } = record
        return (
          <Space onClick={e => e.stopPropagation()}>
            <Link>
              编辑
            </Link>
            <ModalForm<{ roleIds: number[] }>
              width={600}
              title="绑定角色"
              initialValues={{
                roleIds: record.roles.map(role => role.id),
              }}
              onFinish={async ({ roleIds }) => {
                await bindRoles.mutateAsync({ id, body: roleIds })
                return true
              }}
              isKeyPressSubmit
              modalProps={{ destroyOnClose: true }}
              trigger={<Typography.Link>绑定角色</Typography.Link>}
            >
              <BindRolesForm row={record} permissionTree={data} />
            </ModalForm>
            <Link
              type="danger"
              onClick={() => {
                modal.confirm({
                  title: '删除权限',
                  content: (
                    <>
                      确定要删除
                      <span className="font-bold text-primary mx-0.5">{record.name}</span>
                      权限吗？
                    </>
                  ),
                  okButtonProps: {
                    danger: true,
                  },
                  async onOk() {
                    await api.permissionService.delete({ id })
                    message.success('删除成功')
                    refetch()
                  },
                })
              }}
            >
              删除
            </Link>
          </Space>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <QueryFilter span={8} defaultCollapsed className="card">
        <ProFormText name="keywords" label="关键词" placeholder="权限名称/权限编码" />
      </QueryFilter>
      <div className="card space-y-4">
        <div className="flex items-center gap-2">
          <Typography.Title level={5} className="mb-0 mr-auto">菜单树</Typography.Title>
          <ModalForm<PermissionInput>
            title="创建权限"
            width={500}
            onFinish={async (body) => {
              await createPermission.mutateAsync({ body })
              return true
            }}
            isKeyPressSubmit
            modalProps={{ destroyOnClose: true }}
            trigger={<Button type="primary">创建权限</Button>}
          >
            <ProFormTreeSelect
              name="parentId"
              label="上级权限"
              fieldProps={{
                fieldNames: {
                  label: 'name',
                  value: 'id',
                  children: 'children',
                },
                treeData: data,
              }}
            />
            <ProFormSelect
              name="type"
              label="权限类别"
              valueEnum={PermissionTypeNames}
              rules={[{ required: true }]}
            />
            <ProFormText name="name" label="权限名称" rules={[{ required: true }]} />
            <ProFormDependency name={['parentId']}>
              {({ parentId }) => {
                const parentCodes: string[] = []
                let prefix: string | undefined
                function traverseTree(tree: PermissionView[]) {
                  for (const node of tree) {
                    parentCodes.push(node.code)
                    if (node.id === parentId) {
                      throw parentCodes.join(':')
                    }
                    if (node.children) {
                      traverseTree(node.children)
                    }
                    parentCodes.pop()
                  }
                }
                try {
                  traverseTree(data)
                }
                catch (path) {
                  prefix = path as string
                }
                return (
                  <>
                    <ProFormText
                      fieldProps={{
                        addonBefore: prefix
                          ? (
                              <span className="font-mono">
                                {prefix}
                                :
                              </span>
                            )
                          : null,
                      }}
                      name="code"
                      label="权限编码"
                      rules={[{ required: true }]}
                    />
                  </>
                )
              }}
            </ProFormDependency>
          </ModalForm>
        </div>
        <Table<PermissionView>
          columns={columns}
          bordered
          size="middle"
          expandable={{
            expandRowByClick: true,
          }}
          dataSource={tree}
          rowKey={row => row.id}
        />
      </div>
    </div>
  )
}
