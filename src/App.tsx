import type { ApiError } from './api'
import { StyleProvider } from '@ant-design/cssinjs'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
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

  const onError = ({ title, detail }: ApiError) => {
    if (title === 'Unauthorized') {
      localStorage.removeItem('token')
      message.error('未登录或登录已过期')
      router.navigate({ to: '/sign-in' })
    }
    else {
      message.error(detail)
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
