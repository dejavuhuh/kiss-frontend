import type { RequestOf } from '@/api'
import { api } from '@/api'
import { ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { App, Button, Form, Typography } from 'antd'

export const Route = createFileRoute('/_authentication/sign-in/')({
  component: SignIn,
})

type SignInRequest = RequestOf<typeof api.authenticationService.signIn>['body']

function SignIn() {
  const { notification } = App.useApp()
  const navigate = Route.useNavigate()

  const signIn = useMutation({
    mutationFn: api.authenticationService.signIn,
    onSuccess(token) {
      localStorage.setItem('token', token)
      notification.success({
        message: '登录成功',
        description: '欢迎回来',
      })
      navigate({ to: '/' })
    },
  })

  return (
    <div className="card min-w-md flex flex-col gap-4">
      <Typography.Title level={3}>登录</Typography.Title>
      <Form<SignInRequest>
        layout="vertical"
        onFinish={body => signIn.mutate({ body })}
      >
        <ProFormText label="用户名" name="username" rules={[{ required: true }]} />
        <ProFormText.Password label="密码" name="password" rules={[{ required: true }]} />
        <Button type="primary" block htmlType="submit" loading={signIn.isPending}>登录</Button>
      </Form>
      <Link className="self-center" to="/sign-up">没有账号？去注册</Link>
    </div>
  )
}
