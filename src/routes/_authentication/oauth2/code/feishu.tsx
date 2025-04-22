import { api } from '@/api'
import { createFileRoute } from '@tanstack/react-router'
import { Spin, Typography } from 'antd'
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

  useEffect(() => {
    api.feishuService.authorize({
      code,
      redirectUri,
    })
  }, [code])

  return (
    <div className="flex flex-col items-center gap-3">
      <Spin percent="auto" size="large" />
      <Typography.Title level={5}>飞书登录中</Typography.Title>
    </div>
  )
}
