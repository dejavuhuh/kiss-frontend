import type { MenuProps } from 'antd'
import { MenuOutlined, SafetyOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { Menu } from 'antd'
import { cn } from '../utils.ts'
import useSidebar from './useSidebar.ts'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: '/rbac',
    label: 'RBAC',
    icon: <SafetyOutlined />,
    children: [
      {
        key: '/rbac/user',
        label: 'User',
        icon: <UserOutlined />,
      },
      {
        key: '/rbac/role',
        label: 'Role',
        icon: <TeamOutlined />,
      },
      {
        key: '/rbac/menu',
        label: 'Menu',
        icon: <MenuOutlined />,
      },
    ],
  },
]

interface SidebarProps {
  className: string
}

function getDefaultOpenKeys(pathname: string): string[] {
  const result: string[] = []
  let prefix = pathname
  do {
    const lastIndexOfSlash = prefix.lastIndexOf('/')
    prefix = prefix.slice(0, lastIndexOfSlash)
    if (prefix.startsWith('/')) {
      result.push(prefix)
    }
  } while (prefix.startsWith('/'))

  return result
}

export default function Sidebar({ className }: SidebarProps) {
  const expanded = useSidebar(state => state.expanded)
  const { pathname } = useLocation()
  const defaultOpenKeys = getDefaultOpenKeys(pathname)
  const navigate = useNavigate()

  return (
    <aside className={cn(className, 'flex flex-col')}>
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        className="flex-1 !border-none"
        mode="inline"
        inlineCollapsed={!expanded}
        items={items}
        onClick={({ key }) => navigate({ to: key })}
      />
    </aside>
  )
}
