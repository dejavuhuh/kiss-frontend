import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { ModalForm, ProFormCheckbox, ProFormSelect, ProFormSwitch, ProFormText, ProFormTreeSelect, Search } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Input, Table, Typography } from 'antd'

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
    },
    {
      title: '是否为叶子节点',
      dataIndex: 'isLeaf',
      render: value => value ? '是' : '否',
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
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
