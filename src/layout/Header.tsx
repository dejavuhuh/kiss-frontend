import type { MenuProps } from 'antd'
import api from '@/api'
import useAuthentication from '@/authentication'
import { UserAvatar } from '@/components'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button, Dropdown, Tooltip } from 'antd'
import { cn } from '../utils.ts'
import useSidebar from './useSidebar.ts'

interface HeaderProps {
  className: string
}

export default function Header({ className }: HeaderProps) {
  const { expanded, expand, collapse } = useSidebar()
  const user = useAuthentication(state => state.user)
  const reset = useAuthentication(state => state.reset)
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
      onClick: () => navigate({
        to: '/profile',
      }),
    },
    {
      type: 'divider',
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => {
        api.authenticationService.logout().then(reset)
      },
    },
  ]

  return (
    <header className={cn(className, 'sticky top-0 flex flex-row items-center px-3 bg-background')}>
      <Tooltip title={expanded ? '折叠菜单' : '展开菜单'}>
        <Button
          color="default"
          variant="text"
          onClick={expanded ? collapse : expand}
          icon={expanded ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        />
      </Tooltip>
      <div className="flex-1" />
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button color="default" variant="text" icon={<UserAvatar size="small" userId={user.id} />}>
          {user.username}
        </Button>
      </Dropdown>
    </header>
  )
}
