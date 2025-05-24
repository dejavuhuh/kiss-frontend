import type { MenuProps } from 'antd'
import { api } from '@/api'
import { cn } from '@/utils'
import { filterTree } from '@/utils/tree'
import { hasPermission, setCurrentUser } from '@/utils/user'
import { ApartmentOutlined, ApiOutlined, BellOutlined, ClockCircleOutlined, CodeOutlined, EditOutlined, FileTextOutlined, IdcardOutlined, IssuesCloseOutlined, LogoutOutlined, MenuFoldOutlined, PayCircleOutlined, ProductOutlined, SecurityScanOutlined, SettingOutlined, TaobaoOutlined, UploadOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons'
import { createFileRoute, Link, Outlet, redirect, useLocation } from '@tanstack/react-router'
import { Button, Menu, Spin } from 'antd'
import { Suspense, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const menus: MenuItem[] = [
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
        label: <Link to="/system/permission">页面权限</Link>,
        icon: <SecurityScanOutlined />,
      },
      {
        key: '/system/api',
        label: <Link to="/system/api">接口权限</Link>,
        icon: <ApiOutlined />,
      },
      {
        key: '/system/job',
        label: <Link to="/system/job">定时任务</Link>,
        icon: <ClockCircleOutlined />,
      },
      {
        key: '/system/config',
        label: <Link to="/system/config">配置中心</Link>,
        icon: <SettingOutlined />,
      },
    ],
  },
  {
    key: '/user',
    label: '用户中心',
    icon: <UserOutlined />,
    children: [
      {
        key: '/user/my-application',
        label: <Link to="/user/my-application">我的申请</Link>,
        icon: <IdcardOutlined />,
      },
    ],
  },
  {
    key: '/flow',
    label: '流程管理',
    icon: <ApartmentOutlined />,
    children: [
      {
        key: '/flow/editor',
        label: <Link to="/flow/editor">流程编辑器</Link>,
        icon: <EditOutlined />,
      },
    ],
  },
  {
    key: '/payment',
    label: '支付管理',
    icon: <PayCircleOutlined />,
    children: [
      {
        key: '/payment/subscription',
        label: <Link to="/payment/subscription">订阅服务</Link>,
      },
      {
        key: '/payment/recharge',
        label: <Link to="/payment/recharge">充值服务</Link>,
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
      {
        key: '/trace/issue',
        label: <Link to="/trace/issue">问题反馈</Link>,
        icon: <IssuesCloseOutlined />,
      },
    ],
  },
  {
    key: '/fault',
    label: <Link to="/fault">故障演练</Link>,
    icon: <BellOutlined />,
  },
  {
    key: '/component',
    label: '自定义组件',
    icon: <CodeOutlined />,
    children: [
      {
        key: '/component/s3-upload',
        label: <Link to="/component/s3-upload">S3上传组件</Link>,
        icon: <UploadOutlined />,
      },
      {
        key: '/component/rich-text-editor',
        label: <Link to="/component/rich-text-editor">富文本编辑器</Link>,
        icon: <EditOutlined />,
      },
    ],
  },
  {
    key: '/e-commerce',
    label: '电商业务',
    icon: <TaobaoOutlined />,
    children: [
      {
        key: '/e-commerce/product',
        label: '商品管理',
        icon: <ProductOutlined />,
        children: [
          {
            key: '/e-commerce/product/category',
            label: <Link to="/e-commerce/product/category">商品分类</Link>,
          },
        ],
      },
    ],
  },
]

const WHITE_LIST = [
  '/dashboard',
  '/user',
  '/user/my-application',
  '/403',
]

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
  async beforeLoad({ location, context: { queryClient } }) {
    const currentUser = await queryClient.ensureQueryData({
      queryKey: ['current-user'],
      queryFn: api.authenticationService.getCurrentUser,
    })
    setCurrentUser(currentUser)

    // Check permission
    const path = location.pathname
    const permissionCode = path.slice(1).replace(/\//g, ':')
    if (!hasPermission(permissionCode) && !WHITE_LIST.includes(path)) {
      throw redirect({ to: '/403' })
    }
  },
})

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

  const navigate = Route.useNavigate()
  const parentKeys = collectParentKeys(pathname)

  const accessibleMenus = filterTree(menus, (item) => {
    const path = item.key
    const permissionCode = path.slice(1).replace(/\//g, ':')
    return WHITE_LIST.includes(path) || hasPermission(permissionCode)
  })

  return (
    <div className="h-screen flex">
      <nav className={cn('border-r p-1 transition-[width] duration-300', collapsed ? 'w-fit' : 'w-56')}>
        <Menu
          className="border-r-0 transition-none"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={parentKeys}
          inlineCollapsed={collapsed}
          items={accessibleMenus}
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
