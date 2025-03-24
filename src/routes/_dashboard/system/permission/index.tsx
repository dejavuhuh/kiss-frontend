import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { mapTree, traverseTree } from '@/utils/tree'
import { ModalForm, ProFormDependency, ProFormSelect, ProFormText, ProFormTreeSelect, QueryFilter } from '@ant-design/pro-components'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Table, Tag, Typography } from 'antd'
import { useMemo } from 'react'

export const Route = createFileRoute('/_dashboard/system/permission/')({
  component: PermissionManagement,
})

type PermissionInput = RequestOf<typeof api.permissionService.create>['body']
type PermissionView = ResponseOf<typeof api.permissionService.list>[number]

const PermissionTypeNames: Record<PermissionView['type'], string> = {
  DIRECTORY: '目录',
  PAGE: '页面',
  BUTTON: '按钮',
}

const PermissionTypeColors: Record<PermissionView['type'], string> = {
  DIRECTORY: 'processing',
  PAGE: 'cyan',
  BUTTON: 'magenta',
}

function PermissionManagement() {
  const { message } = App.useApp()

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
    return mapTree<PermissionView, PermissionView>(data, (node, parent) => ({
      ...node,
      code: parent ? `${parent.code}:${node.code}` : node.code,
    }))
  }, [data])

  const createPermission = useMutation({
    mutationFn: api.permissionService.create,
    onSuccess() {
      message.success('创建成功')
      refetch()
    },
  })

  const columns: TableProps<PermissionView>['columns'] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      width: 300,
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
      render: () => (
        <>
          <Tag>Admin</Tag>
        </>
      ),
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      width: 400,
      render: text => <Typography.Text copyable className="font-mono">{text}</Typography.Text>,
    },
    {
      title: '操作',
      render: (_, { id }) => (
        <>
          <Button
            type="link"
            size="small"
            onClick={async (e) => {
              e.stopPropagation()
              // await api.permissionService.bindableRoles({ id })
            }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <QueryFilter span={8} defaultCollapsed className="card">
        <ProFormText name="keywords" label="关键词" placeholder="权限名称/权限编码" />
      </QueryFilter>
      <div className="card space-y-2">
        <div className="flex items-center gap-2">
          <Typography.Title level={5} className="mb-0 mr-auto">权限树</Typography.Title>
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
