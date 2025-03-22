import type { RequestOf } from '@/api'
import { api } from '@/api'
import { ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { App, Button, Form, Typography } from 'antd'

export const Route = createFileRoute('/_authentication/sign-up/')({
  component: SignUp,
})

type SignUpRequest = RequestOf<typeof api.authenticationService.signUp>['body']

function SignUp() {
  const { notification } = App.useApp()
  const navigate = Route.useNavigate()

  const signUp = useMutation({
    mutationFn: api.authenticationService.signUp,
    onSuccess() {
      notification.success({
        message: '注册成功',
        description: '去登录',
      })
      navigate({ to: '/sign-in' })
    },
  })

  return (
    <div className="card min-w-md flex flex-col gap-4">
      <Typography.Title level={3}>注册</Typography.Title>
      <Form<SignUpRequest>
        layout="vertical"
        onFinish={body => signUp.mutate({ body })}
      >
        <ProFormText label="用户名" name="username" rules={[{ required: true }]} />
        <ProFormText.Password label="密码" name="password" rules={[{ required: true }]} />
        <Button type="primary" block htmlType="submit" loading={signUp.isPending}>注册</Button>
      </Form>
      <Link className="self-center" to="/sign-in">已有账号？去登录</Link>
    </div>
  )
}
