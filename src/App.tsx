import type { AuthenticationState } from '@/authentication'
import type { ProblemDetail } from './types/api.ts'
import api from '@/api'
import useAuthentication from '@/authentication'
import Profile from '@/profile'
import Menu from '@/rbac/menu'
import User from '@/rbac/user'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
  redirect,
  RouterProvider,
} from '@tanstack/react-router'
import { App as AntdApp, Spin } from 'antd'
import { HttpStatus } from 'http-status-ts'
import PubSub from 'pubsub-js'
import { useEffect } from 'react'
import { z } from 'zod'
import { Loading } from './components'
import { onError } from './constants/event.ts'
import Layout from './layout'
import Login from './login'
import Role from './rbac/role'

const rootRoute = createRootRouteWithContext<{ authenticated: AuthenticationState['authenticated'] }>()({
  component: Outlet,
})

export const login = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.authenticated) {
      throw redirect({ to: search.redirect || '/' })
    }
  },
})

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/rbac/role' })
  },
})

const layout = createRoute({
  getParentRoute: () => rootRoute,
  id: '_layout',
  component: Layout,
  beforeLoad: ({ context, location }) => {
    if (!context.authenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  shouldReload: ({ context }) => !context.authenticated,
})

const profile = createRoute({
  getParentRoute: () => layout,
  path: '/profile',
  component: Profile,
})

const rbacUser = createRoute({
  getParentRoute: () => layout,
  path: '/rbac/user',
  component: User,
})

const rbacRole = createRoute({
  getParentRoute: () => layout,
  path: '/rbac/role',
  component: Role,
})

const rbacMenu = createRoute({
  getParentRoute: () => layout,
  path: '/rbac/menu',
  component: Menu,
})

const routeTree = rootRoute.addChildren([
  login,
  home,
  layout.addChildren([
    profile,
    rbacRole,
    rbacUser,
    rbacMenu,
  ]),
])

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    authenticated: undefined!,
  },
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  const { message } = AntdApp.useApp()
  const { authenticated, setUser, unAuthenticate } = useAuthentication()

  useEffect(() => {
    const token = PubSub.subscribe(onError, async (_, problemDetail: ProblemDetail) => {
      if (problemDetail.status === HttpStatus.UNAUTHORIZED) {
        unAuthenticate()
        await router.invalidate()
      }
      message.error(problemDetail.detail ?? problemDetail.title)
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [message, unAuthenticate])

  useEffect(() => {
    if (authenticated === undefined) {
      api.authenticationService
        .getCurrentUser()
        .then(setUser)
        .catch(unAuthenticate)
    }
  }, [authenticated, setUser, unAuthenticate])

  if (authenticated === undefined) {
    return <Spin spinning fullscreen tip="Loading..." />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{ authenticated }}
      />
      <Loading />
    </QueryClientProvider>
  )
}
