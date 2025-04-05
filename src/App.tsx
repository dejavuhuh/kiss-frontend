import type { ApiError, RequestOf } from '@/api'
import { api } from '@/api'
import { StyleProvider } from '@ant-design/cssinjs'
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { ProFormItem, ProFormText } from '@ant-design/pro-components'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'

import { useFullscreen } from 'ahooks'
import { App as AppWrapper, Button, ConfigProvider, Form, Modal, Space, Typography } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useRef, useState } from 'react'
import { RichTextEditor } from './components/form'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import './index.css'

// Create a new router instance
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError
  }
}

function App() {
  return (
    <StyleProvider layer container={document.body}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          cssVar: true,
          hashed: false,
          token: {
            colorBgLayout: '#f7fafc',
          },
          components: {
            Menu: {
              collapsedWidth: 48,
            },
            Table: {
              cellPaddingInlineMD: 12,
            },
          },
        }}
      >
        <AppWrapper>
          <InnerApp />
        </AppWrapper>
      </ConfigProvider>
    </StyleProvider>
  )
}

function InnerApp() {
  const { message } = AppWrapper.useApp()
  const [issueContext, setIssueContext] = useState<IssueContext>()

  const onError = ({ detail, status, traceId, request }: ApiError) => {
    if (status === 401) {
      localStorage.removeItem('token')
      message.error('未登录或登录已过期')
      router.navigate({ to: '/sign-in' })
    }
    else if (status === 400) {
      message.error(detail)
    }
    else if (status === 500) {
      const key = crypto.randomUUID()
      message.open({
        key,
        type: 'error',
        content: (
          <div className="flex items-center">
            服务器内部错误
            <Button
              size="small"
              type="link"
              onClick={() => setIssueContext({ request, traceId })}
            >
              问题反馈
            </Button>
            <div onClick={() => message.destroy(key)} className="group flex items-center justify-center p-1 rounded hover:bg-bg-text-hover cursor-pointer transition-colors">
              <CloseOutlined className="size-3 text-secondary group-hover:text-icon-hover transition-colors" />
            </div>
          </div>
        ),
      })
    }
    else {
      message.error('系统未知异常')
    }
  }

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError,
    }),
    queryCache: new QueryCache({
      onError,
    }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <IssueReportModal context={issueContext} open={!!issueContext} onCancel={() => setIssueContext(undefined)} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

type IssueInput = RequestOf<typeof api.issueService.report>['body']
type IssueFormValues = Pick<IssueInput, 'title' | 'description'>
type IssueContext = Pick<IssueInput, 'request' | 'traceId'>

interface IssueReportModalProps {
  context?: IssueContext
  open: boolean
  onCancel: () => void
}

function IssueReportModal({ context, open, onCancel }: IssueReportModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(containerRef)
  const { message } = AppWrapper.useApp()

  const reportIssue = useMutation({
    mutationFn: api.issueService.report,
  })

  if (!context) {
    return null
  }

  return (
    <Modal
      centered
      title="问题反馈"
      open={open}
      width={800}
      onCancel={onCancel}
      maskClosable={false}
      modalRender={() => (
        <div ref={containerRef} className="card px-6 py-5 pointer-events-auto">
          <div className="flex items-center mb-4">
            <Typography.Title className="mb-0" level={5}>问题反馈</Typography.Title>
            <Space className="ml-auto">
              <Button onClick={toggleFullscreen} type="text" className="text-icon text-base" icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />} size="small" />
              <Button onClick={onCancel} type="text" className="text-icon text-base" icon={<CloseOutlined />} size="small" />
            </Space>
          </div>
          <Form<IssueFormValues>
            layout="vertical"
            onFinish={async (values) => {
              await reportIssue.mutateAsync({
                body: {
                  ...context,
                  ...values,
                },
              })
              message.success('反馈成功')
              onCancel()
            }}
          >
            <ProFormText label="标题" name="title" rules={[{ required: true }]} />
            <ProFormItem label="详细描述" name="description" rules={[{ required: true }]}>
              <RichTextEditor bucket="system-error-screenshot" className="min-h-96" />
            </ProFormItem>
            <div className="flex justify-end gap-2">
              <Button onClick={onCancel}>取消</Button>
              <Button type="primary" htmlType="submit" loading={reportIssue.isPending}>提交</Button>
            </div>
          </Form>
        </div>
      )}
    />
  )
}

export default App
