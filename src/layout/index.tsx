import { Outlet } from '@tanstack/react-router'
import { cn } from '../utils.ts'
import Content from './Content.tsx'
import Header from './Header.tsx'
import Sidebar from './Sidebar.tsx'
import useSidebar from './useSidebar.ts'

export default function Layout() {
  const expanded = useSidebar(state => state.expanded)

  return (
    <div className="h-full flex flex-row">
      <Sidebar className={cn('transition-width duration-300 border-r', expanded ? 'w-[220px]' : 'w-[81px]')} />
      <div className="flex-1 flex flex-col">
        <Header className="h-[56px] border-b" />
        <Content className="flex-1 p-4 overflow-y-auto bg-[#F7FAFC]">
          <Outlet />
        </Content>
      </div>
    </div>
  )
}
