import type { InputOf, SpecificationOf, ViewOf } from '@/api'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import api from '@/api'
import { ModalForm, Table } from '@/components'
import ManageMenusButton from '@/rbac/role/ManageMenusButton.tsx'
import { PlusOutlined } from '@ant-design/icons'
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { Button, Divider, Space } from 'antd'
import { useRef } from 'react'

type RoleSpecification = SpecificationOf<typeof api.roleService.findByPage>
type RoleView = ViewOf<typeof api.roleService.findByPage>
type RoleInput = InputOf<typeof api.roleService.create>

export default () => {
  const actionRef = useRef<ActionType>()

  const columns: ProColumns<RoleView>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      render: (_dom, { id, ...body }, _index, action) => {
        return (
          <Space split={<Divider type="vertical" />}>
            <ModalForm<RoleInput>
              key="edit"
              width={500}
              initialValues={body}
              onSubmit={
                body => api.roleService
                  .update({ id, body })
                  .then(() => action?.reload())
              }
              trigger={<a>Edit</a>}
            >
              <ProFormText name="name" label="Name" rules={[{ required: true }]} />
              <ProFormTextArea name="description" label="Description" />
            </ModalForm>
            <ManageMenusButton key="manage-menus" id={id} />
            <a
              key="delete"
              onClick={async () => {
                await api.roleService.deleteById({ id })
                action?.reload()
              }}
            >
              Delete
            </a>
          </Space>
        )
      },
    },
  ]

  return (
    <Table<RoleView, RoleSpecification>
      columns={columns}
      actionRef={actionRef}
      request={api.roleService.findByPage}
      headerTitle="Role List"
      toolBarRender={() => [
        <ModalForm<RoleInput>
          key="create"
          width={500}
          onSubmit={
            body => api.roleService
              .create({ body })
              .then(() => actionRef.current?.reload())
          }
          trigger={(
            <Button icon={<PlusOutlined />} type="primary">
              New Role
            </Button>
          )}
        >
          <ProFormText name="name" label="Name" rules={[{ required: true }]} />
          <ProFormTextArea name="description" label="Description" />
        </ModalForm>,
      ]}
    />
  )
}
