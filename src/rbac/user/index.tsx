import type { InputOf, SpecificationOf, ViewOf } from '@/api'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import api from '@/api'
import { ModalForm, Table } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useRef } from 'react'

type UserSpecification = SpecificationOf<typeof api.userService.findByPage>
type UserView = ViewOf<typeof api.userService.findByPage>
type UserInput = InputOf<typeof api.userService.create>

export default () => {
  const actionRef = useRef<ActionType>()

  const { data: options } = useQuery({
    queryKey: [],
    queryFn: api.roleService.findAll,
    initialData: [],
    select: data => data.map(({ id, name }) => ({ label: name, value: id })),
  })

  const columns: ProColumns<UserView>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'roleIds',
      valueType: 'select',
      fieldProps: { options, mode: 'multiple' },
    },
    {
      title: 'Actions',
      valueType: 'option',
      key: 'option',
      render: (_dom, { id, ...body }, _index, action) => {
        return [
          <ModalForm<UserInput>
            key="edit"
            width={500}
            initialValues={body}
            onSubmit={
              body => api.userService
                .update({ id, body })
                .then(() => action?.reload())
            }
            trigger={<a>Edit</a>}
          >
            <ProFormText name="username" label="Username" rules={[{ required: true }]} />
            <ProFormSelect name="roleIds" label="Roles" options={options} mode="multiple" />
          </ModalForm>,
          <a
            key="delete"
            onClick={
              () => api.userService
                .deleteById({ id })
                .then(() => action?.reload())
            }
          >
            Delete
          </a>,
        ]
      },
    },
  ]

  return (
    <Table<UserView, UserSpecification>
      columns={columns}
      actionRef={actionRef}
      request={api.userService.findByPage}
      headerTitle="User List"
      toolBarRender={() => [
        <ModalForm<UserInput>
          key="create"
          width={500}
          onSubmit={
            body => api.userService
              .create({ body })
              .then(() => actionRef.current?.reload())
          }
          trigger={(
            <Button icon={<PlusOutlined />} type="primary">
              New User
            </Button>
          )}
        >
          <ProFormText name="username" label="Username" rules={[{ required: true }]} />
          <ProFormText.Password name="password" label="Password" rules={[{ required: true }]} />
          <ProFormSelect name="roleIds" label="Roles" options={options} mode="multiple" />
        </ModalForm>,
      ]}
    />
  )
}
