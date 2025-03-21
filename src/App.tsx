import type { ApiError } from './api'
import { StyleProvider } from '@ant-design/cssinjs'
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { App as AppWrapper, ConfigProvider } from 'antd'
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

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError({ detail }) {
        message.error(detail)
      },
    }),
  })
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
