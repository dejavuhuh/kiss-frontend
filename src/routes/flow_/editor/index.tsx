import type { Key } from 'react'
import { cn } from '@/utils'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import { useState } from 'react'
import { FlowDesigner } from './components'

export const Route = createFileRoute('/flow_/editor/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<'info' | 'design' | 'settings'>('design')

  return (
    <div className="flex flex-col h-screen">
      <header className="h-15 border-b items-center flex px-2 shrink-0">
        <Button icon={<ArrowLeftOutlined />} type="text" size="large" />
        <div className="flex-1" />
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          options={[
            {
              label: '基础信息',
              value: 'info',
            },
            {
              label: '流程设计',
              value: 'design',
            },
            {
              label: '更多设置',
              value: 'settings',
            },
          ]}
        />
        <div className="flex-1" />
        <Button type="primary" className="mr-2">发布</Button>
      </header>
      <div className="overflow-y-auto">
        {activeTab === 'design' && <FlowDesigner />}
      </div>
    </div>
  )
}

interface TabsProps<T extends Key> {
  options: Array<{
    label: string
    value: T
  }>
  active: T
  onChange: (value: T) => void
}

function Tabs<T extends Key>({ options, active, onChange }: TabsProps<T>) {
  return (
    <div className="flex gap-8 h-full">
      {options.map(({ label, value }, index) => (
        <div
          className={cn(
            'h-full flex items-center gap-[7px] cursor-pointer text-lg relative transition-colors',
            active === value ? 'text-primary' : 'text-secondary',
          )}
          key={value}
          onClick={() => onChange(value)}
        >
          <div
            className={cn(
              'size-6 rounded-full flex items-center justify-center text-[15px] transition-colors',
              active === value ? 'bg-primary text-white' : 'bg-bg-text-hover',
            )}
          >
            {index + 1}
          </div>
          {label}
          {active === value && <div className="absolute bottom-0 rounded-full left-0 w-full h-[2.5px] bg-primary" />}
        </div>
      ))}
    </div>
  )
}
