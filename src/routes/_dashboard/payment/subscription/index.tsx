import type { RequestOf, ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormMoney, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Space, Table, Typography } from 'antd'

export const Route = createFileRoute('/_dashboard/payment/subscription/')({
  component: RouteComponent,
})

type SubscriptionPlanInput = RequestOf<typeof api.subscriptionPlanService.create>['body']
type SubscriptionPlanView = ResponseOf<typeof api.subscriptionPlanService.list>[number]

const BillingCycleNames: Record<SubscriptionPlanView['billingCycle'], string> = {
  MONTHLY: '月付',
  YEARLY: '年付',
}

function RouteComponent() {
  const { message } = App.useApp()

  const {
    reload,
    tableProps,
  } = useTable({
    queryKey: ['subscription', 'plans'],
    queryFn: api.subscriptionPlanService.list,
  })

  const createSubscriptionPlan = useMutation({
    mutationFn: api.subscriptionPlanService.create,
    onSuccess() {
      message.success('创建成功')
      reload()
    },
  })

  const columns: TableProps<SubscriptionPlanView>['columns'] = [
    {
      title: '计划名称',
      dataIndex: 'name',
    },
    {
      title: '支付周期',
      dataIndex: 'billingCycle',
      render: (_value, { billingCycle }) => BillingCycleNames[billingCycle],
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: value => `￥${value}`,
    },
  ]

  return (
    <div className="card">
      <Space direction="vertical" size="middle" className="w-full">
        <div className="flex items-center gap-2">
          <Typography.Title level={5} className="mb-0 mr-auto">订阅计划</Typography.Title>
          <ModalForm<SubscriptionPlanInput>
            title="订阅计划"
            width={500}
            onFinish={async (body) => {
              await createSubscriptionPlan.mutateAsync({ body })
              return true
            }}
            isKeyPressSubmit
            modalProps={{ destroyOnClose: true }}
            trigger={(
              <Button type="primary" icon={<PlusOutlined />}>订阅计划</Button>
            )}
          >
            <ProFormText name="name" label="计划名称" rules={[{ required: true }]} placeholder="个人版/专业版/企业版" />
            <ProFormSelect name="billingCycle" valueEnum={BillingCycleNames} label="支付周期" rules={[{ required: true }]} />
            <ProFormMoney name="price" label="价格" rules={[{ required: true }]} />
          </ModalForm>

        </div>
        <Table id="table" columns={columns} {...tableProps} />
      </Space>
    </div>
  )
}
