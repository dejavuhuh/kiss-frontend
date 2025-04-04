import type { ApiError } from '@/api'
import { api } from '@/api'
import { StyleProvider } from '@ant-design/cssinjs'
import { CloseOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-components'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { App as AppWrapper, Button, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
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
            <ModalForm
              title="问题反馈"
              trigger={<Button size="small" type="link">问题反馈</Button>}
              onFinish={v => console.log(v)}
            >
              <ProFormText label="问题描述" name="description" rules={[{ required: true }]} />
              <ProFormUploadButton
                listType="picture-card"
                label="问题截图"
                name="screenshot"
                rules={[{ required: true }]}
                accept="image/*"
                fieldProps={{
                  async customRequest({ file, onProgress, onSuccess }) {
                    const bucket = 'system-error-screenshot'
                    const method = 'PUT'
                    const objectName = crypto.randomUUID().replace(/-/g, '')

                    const uploadUrl = await api.s3service.preSignedUrl({
                      bucket,
                      method,
                      objectName,
                    })

                    const xhr = new XMLHttpRequest()
                    xhr.open(method, uploadUrl)
                    xhr.upload.addEventListener('progress', (event) => {
                      const percent = Math.round((event.loaded / event.total) * 100)
                      onProgress?.({ percent })
                    })

                    xhr.addEventListener('load', () => {
                      if (xhr.status === 200) {
                        onSuccess?.(objectName)
                      }
                    })

                    xhr.send(file)
                  },
                  async onRemove(file) {
                    const objectName = file.response as string
                    const deleteUrl = await api.s3service.preSignedUrl({
                      bucket: 'system-error-screenshot',
                      method: 'DELETE',
                      objectName,
                    })
                    await fetch(deleteUrl, {
                      method: 'DELETE',
                    })
                    return true
                  },
                  async onPreview(file) {
                    const objectName = file.response as string
                    const downloadUrl = await api.s3service.preSignedUrl({
                      bucket: 'system-error-screenshot',
                      method: 'GET',
                      objectName,
                    })
                    window.open(downloadUrl)
                  },
                }}
              />
            </ModalForm>
            <div onClick={() => message.destroy(key)} className="group flex items-center justify-center p-1 rounded hover:bg-bg-text-hover cursor-pointer transition-colors">
              <CloseOutlined className="size-3 text-secondary group-hover:text-icon-hover transition-colors" />
            </div>
          </div>
        ),
        duration: 0,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
