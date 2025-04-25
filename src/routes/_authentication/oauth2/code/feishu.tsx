import { api } from '@/api'
import { createFileRoute } from '@tanstack/react-router'
import { App, Spin, Typography } from 'antd'
import { useEffect } from 'react'
import { z } from 'zod'

export const Route = createFileRoute('/_authentication/oauth2/code/feishu')({
  component: FeishuOauth2Callback,
  validateSearch: z.object({
    code: z.string(),
  }),
})

export const redirectUri = `${location.origin}/oauth2/code/feishu/`

function FeishuOauth2Callback() {
  const { code } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { notification } = App.useApp()

  useEffect(() => {
    api.feishuService.authorize({
      code,
      redirectUri,
    }).then((token) => {
      localStorage.setItem('token', token)
      notification.success({
        message: '登录成功',
        description: '欢迎回来',
      })
      navigate({ to: '/' })
    })
  }, [code, navigate, notification])

  return (
    <div className="flex flex-col items-center gap-3">
      <Spin percent="auto" size="large" />
      <Typography.Title level={5}>飞书登录中</Typography.Title>
    </div>
  )
}
