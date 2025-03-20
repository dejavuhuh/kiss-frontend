import type { Key } from 'react'
import { title } from 'node:process'
import { api } from '@/api'
import { ArrowDownOutlined, ContainerOutlined, DeleteOutlined, DownloadOutlined, DownOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons'
import { ProFormDatePicker, ProFormDateTimeRangePicker, ProFormText, QueryFilter } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Badge, Button, Dropdown, Form, Space, Table, Typography } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/system/roles/')({
  component: RolesManagement,
})

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

const columns = [
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
    dataIndex: 'age',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '操作',
    render() {
      return (
        <Space>
          <a>编辑</a>
          <a>详情</a>
          <a className="text-error">删除</a>
        </Space>
      )
    },
  },
]

function RolesManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [form] = Form.useForm()
  const [pageIndex, setPageIndex] = useState(0)

  const { refetch } = useQuery({
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
              <Button danger className="gap-1.5">
                批量删除
                <div className="text-xs text-error bg-error-filled min-w-[18px] py-[0.5px] rounded">{selectedRowKeys.length}</div>
              </Button>
            )}
            <Button>操作日志</Button>
            <Button iconPosition="end" icon={<DownloadOutlined />}>导出数据</Button>
            <Button type="primary">创建角色</Button>
          </div>
          <Table
            size="small"
            dataSource={dataSource}
            columns={columns}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
              columnWidth: 50,
            }}
            pagination={{
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
