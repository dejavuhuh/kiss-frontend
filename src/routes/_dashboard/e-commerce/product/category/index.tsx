import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { SingleS3Upload } from '@/components/form'
import { S3Image } from '@/components/image/S3Image'
import { useTable } from '@/hooks/useTable'
import { formatDateTime } from '@/utils'
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { ModalForm, ProFormDependency, ProFormItem, ProFormSwitch, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Checkbox, Input, Space, Table, Tooltip, Typography } from 'antd'

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
    },
    {
      title: '宣传图',
      dataIndex: 'banner',
      render: value => value && (
        <S3Image
          width={100}
          bucket="static-resource"
          objectName={value}
        />
      ),
    },
    {
      title: (
        <>
          是否启用
          <Tooltip title="被禁用的分类不会显示在前台">
            <QuestionCircleOutlined className="text-secondary ml-1 cursor-pointer" />
          </Tooltip>
        </>
      ),
      dataIndex: 'enabled',
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
            label="是否为末级分类"
            rules={[{ required: true }]}
            tooltip="只有末级分类才能添加商品"
          />
          <ProFormDependency name={['isLeaf']}>
            {({ isLeaf }) => isLeaf && (
              <ProFormItem name="banner" label="宣传图" tooltip="末级分类的宣传图，建议尺寸为 1920x1080" rules={[{ required: true }]}>
                <SingleS3Upload bucket="static-resource" listType="picture-card" crop />
              </ProFormItem>
            )}
          </ProFormDependency>
        </ModalForm>

      </div>
      <div className="card">
        <Table columns={columns} {...tableProps} />
      </div>
    </div>
  )
}
