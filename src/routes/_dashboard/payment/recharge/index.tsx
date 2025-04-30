import type { RequestOf } from '@/api'
import { api } from '@/api'
import { ProFormRadio } from '@ant-design/pro-components'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Form } from 'antd'

export const Route = createFileRoute('/_dashboard/payment/recharge/')({
  component: RouteComponent,
})

type GeneratePaymentPageRequest = RequestOf<typeof api.rechargeService.generateAlipayPage>

function RouteComponent() {
  return (
    <div className="card">
      <Form<GeneratePaymentPageRequest> onFinish={async (values) => {
        const html = await api.rechargeService.generateAlipayPage(values)
        const div = document.createElement('div')
        div.innerHTML = html
        document.body.appendChild(div)
        div.querySelector('form')?.submit()
      }}
      >
        <ProFormRadio.Group
          label="充值金额"
          name="price"
          initialValue="1"
          options={[
            { value: '1', label: '1元' },
            { value: '10', label: '10元' },
            { value: '50', label: '50元' },
            { value: '100', label: '100元' },
          ]}
        />
        <ProFormRadio.Group
          label="支付方式"
          name="paymentMethod"
          initialValue="ALIPAY"
          options={[
            { value: 'ALIPAY', label: '支付宝' },
            { value: 'WECHAT', label: '微信' },
          ]}
        />
        <Button type="primary" htmlType="submit">充值</Button>
      </Form>
    </div>
  )
}
