import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import './index.css'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const queryClient = new QueryClient()

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
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
          <App>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </App>
        </ConfigProvider>
      </StyleProvider>
    </StrictMode>,
  )
}
