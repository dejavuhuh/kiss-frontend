import type { RequestOf } from '@/api'
import { api } from '@/api'
import { DingtalkOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { App, Button, Form, Segmented, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { redirectUri } from '../oauth2/code/feishu'

export const Route = createFileRoute('/_authentication/sign-in/')({
  component: SignIn,
})

type SignInRequest = RequestOf<typeof api.authenticationService.signIn>['body']
type LoginType = 'account' | 'feishu'

function SignIn() {
  const { notification } = App.useApp()
  const navigate = Route.useNavigate()
  const [tab, setTab] = useState<LoginType>('feishu')

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
      <div className="flex flex-col items-center mt-2">
        <Typography.Title level={4} className="mb-5">用户登录</Typography.Title>
        <Segmented<LoginType>
          className="w-fit"
          value={tab}
          onChange={setTab}
          options={[
            {
              label: '账号登录',
              value: 'account',
              icon: <UserOutlined />,
            },
            {
              label: '飞书登录',
              value: 'feishu',
              icon: <DingtalkOutlined />,
            },
          ]}
        />
      </div>
      {tab === 'account' && (
        <div className="flex flex-col gap-4">
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
      )}
      {tab === 'feishu' && <FeishuQRCode />}
    </div>
  )
}

function FeishuQRCode() {
  useEffect(() => {
    const goto = `https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=cli_a771707732b9d013&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=STATE`
    const QRLoginObj = QRLogin({
      id: 'feishu_qr_code',
      goto,
      width: '300',
      height: '250',
    })

    const handleMessage = (event) => {
      // 使用 matchOrigin 和 matchData 方法来判断 message 和来自的页面 url 是否合法
      if (QRLoginObj.matchOrigin(event.origin) && QRLoginObj.matchData(event.data)) {
        const loginTmpCode = event.data.tmp_code
        window.location.href = `${goto}&tmp_code=${loginTmpCode}`
      }
    }

    window.addEventListener('message', handleMessage, false)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <div className="flex justify-center" id="feishu_qr_code" />
  )
}
