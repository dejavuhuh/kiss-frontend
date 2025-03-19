import type { MenuProps } from 'antd'
import { cn } from '@/utils'
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Button, Menu } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
]
function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="h-screen flex">
      <nav className={cn('border-r p-1 transition-[width] duration-300', collapsed ? 'w-fit' : 'w-56')}>
        <Menu
          className="border-r-0 transition-none"
          mode="inline"
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
