import type { MenuProps } from 'antd'
import { cn } from '@/utils'
import { ClockCircleOutlined, MenuFoldOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { Button, Menu } from 'antd'
import { useState } from 'react'

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
        key: '/system/roles',
        label: <Link to="/system/roles">角色管理</Link>,
        icon: <UsergroupAddOutlined />,
      },
      {
        key: '/system/jobs',
        label: <Link to="/system/jobs">定时任务</Link>,
        icon: <ClockCircleOutlined />,
      },
    ],
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
        </header>
        <main className="flex-1 p-4 overflow-y-auto bg-layout">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
