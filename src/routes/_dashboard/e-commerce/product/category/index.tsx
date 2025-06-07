import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { formatDateTime } from '@/utils'
import { PlusOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormSwitch, ProFormText, ProFormTreeSelect, Search } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Checkbox, Input, Space, Table, Tag, Tooltip, Typography } from 'antd'

type ProductCategoryInput = RequestOf<typeof api.productCategoryService.create>['body']
type ProductCategoryView = ResponseOf<typeof api.productCategoryService.list>[number]

export const Route = createFileRoute('/_dashboard/e-commerce/product/category/')({
  component: ProductCategoryManagement,
})

function ProductCategoryManagement() {
  const { message } = App.useApp()

  const {
    tableProps,
    reload,
  } = useTable({
    queryKey: ['product-categories'],
    queryFn: api.productCategoryService.list,
    showPagination: false,
    showCheckbox: false,
  })

  const createCategory = useMutation({
    mutationFn: api.productCategoryService.create,
    onSuccess() {
      message.success('创建成功')
      reload()
    },
  })

  const columns: TableProps<ProductCategoryView>['columns'] = [
    {
      title: '分类名称',
      dataIndex: 'name',
      width: 250,
      render: (text, { isLeaf }) => (
        <div className="flex items-center">
          <Tag
            bordered={false}
            color={isLeaf ? 'purple' : 'blue'}
          >
            {isLeaf ? '叶子' : '目录'}
          </Tag>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '商品数量',
      dataIndex: 'productCount',
      render: () => '1000',
    },
    {
      title: (
        <>
          是否启用
          <Tooltip title='被禁用的分类不会显示在前台'>
            <QuestionCircleOutlined className="text-secondary ml-1 cursor-pointer" />
          </Tooltip>
        </>
      ),
      dataIndex: 'enabled',
      align: 'center',
      render: () => <Checkbox defaultChecked />,
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: formatDateTime,
    },
    {
      title: '创建人',
      dataIndex: ['creator', 'displayName'],
      render: () => 'admin',
    },
    {
      title: '操作',
      width: 200,
      render(_, { id, ...record }) {
        return (
          <Space>
            <Typography.Link>添加下级</Typography.Link>
            <Typography.Link>编辑</Typography.Link>
            <Typography.Link type="danger">删除</Typography.Link>
          </Space>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex items-center gap-3">
        <Typography.Title level={5} className="mb-0">商品分类管理</Typography.Title>
        <Input
          className="w-3xs ml-auto"
          placeholder="搜索分类..."
          prefix={<SearchOutlined className="text-secondary/70" />}
        />
        <Button>导出数据</Button>
        <ModalForm<ProductCategoryInput>
          title="创建分类"
          width={500}
          onFinish={async (body) => {
            await createCategory.mutateAsync({ body })
            return true
          }}
          isKeyPressSubmit
          modalProps={{ destroyOnClose: true }}
          trigger={<Button type="primary">创建分类</Button>}
        >
          <ProFormTreeSelect name="parentId" label="上级分类" />
          <ProFormText name="name" label="分类名称" rules={[{ required: true }]} />
          <ProFormSwitch
            initialValue={false}
            name="isLeaf"
            label="是否为叶子节点"
            rules={[{ required: true }]}
            tooltip="只有叶子节点才能添加商品"
          />
        </ModalForm>

      </div>
      <div className="card">
        <Table columns={columns} {...tableProps} />
      </div>
    </div>
  )
}
