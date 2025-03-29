import type { MenuProps } from 'antd'
import { api } from '@/api'
import { cn } from '@/utils'
import { setCurrentUser } from '@/utils/user'
import { BellOutlined, ClockCircleOutlined, FileTextOutlined, IdcardOutlined, LoginOutlined, LogoutOutlined, MenuFoldOutlined, SecurityScanOutlined, SettingOutlined, UsergroupAddOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { Button, Menu, Spin } from 'antd'
import { Suspense, useState } from 'react'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '/system',
    label: '系统管理',
    icon: <SettingOutlined />,
    children: [
      {
        key: '/system/user',
        label: <Link to="/system/user">用户管理</Link>,
        icon: <UserOutlined />,
      },
      {
        key: '/system/role',
        label: <Link to="/system/role">角色管理</Link>,
        icon: <UsergroupAddOutlined />,
      },
      {
        key: '/system/permission',
        label: <Link to="/system/permission">权限管理</Link>,
        icon: <SecurityScanOutlined />,
      },
      {
        key: '/system/job',
        label: <Link to="/system/job">定时任务</Link>,
        icon: <ClockCircleOutlined />,
      },
    ],
  },
  {
    key: '/trace',
    label: '链路追踪',
    icon: <FileTextOutlined />,
    children: [
      {
        key: '/trace/session',
        label: <Link to="/trace/session">会话管理</Link>,
        icon: <IdcardOutlined />,
      },
    ],
  },
  {
    key: '/fault',
    label: <Link to="/fault">故障演练</Link>,
    icon: <BellOutlined />,
  },
]

function collectParentKeys(pathname: string) {
  const parentKeys: string[] = []
  let current = pathname
  for (let i = pathname.length - 1; i > 0; i--) {
    if (pathname[i] === '/') {
      current = pathname.slice(0, i)
      parentKeys.push(current)
    }
  }
  return parentKeys
}

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  const { data, isPending, error } = useQuery({
    queryKey: ['current-user'],
    queryFn: api.authenticationService.getCurrentUser,
  })

  const navigate = Route.useNavigate()

  if (isPending || error) {
    return 'Loading...'
  }
  setCurrentUser(data)

  const parentKeys = collectParentKeys(pathname)

  return (
    <div className="h-screen flex">
      <nav className={cn('border-r p-1 transition-[width] duration-300', collapsed ? 'w-fit' : 'w-56')}>
        <Menu
          className="border-r-0 transition-none"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={parentKeys}
          inlineCollapsed={collapsed}
          items={items}
        />
      </nav>
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center px-2 border-b">
          <Button
            onClick={() => setCollapsed(!collapsed)}
            icon={(
              <MenuFoldOutlined className={cn('transition-transform', { 'rotate-180': collapsed })} />
            )}
            variant="text"
            color="default"
          />
          <Button
            onClick={async () => {
              await api.authenticationService.signOut()
              localStorage.removeItem('token')
              navigate({ to: '/sign-in' })
            }}
            className="ml-auto"
            icon={<LogoutOutlined />}
            variant="text"
            color="default"
          >
            登出
          </Button>
        </header>
        <main className="flex-1 p-4 overflow-y-auto bg-layout">
          <Suspense fallback={(
            <div className="h-full flex flex-col gap-4 items-center justify-center">
              <Spin size="large" />
              <span className="text-primary">数据加载中</span>
            </div>
          )}
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
