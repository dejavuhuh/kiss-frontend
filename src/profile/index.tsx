import Basic from '@/profile/Basic.tsx'
import { Menu } from 'antd'
import React, { useState } from 'react'

type MenuKey = 'basic'
const ContentMap: Record<MenuKey, React.ReactNode> = {
  basic: <Basic />,
}

export default () => {
  const [selectKey, setSelectKey] = useState<MenuKey>('basic')

  return (
    <div className="flex flex-row gap-2 bg-background rounded-md p-2">
      <Menu
        className="w-[224px] pr-1"
        mode="vertical"
        selectedKeys={[selectKey]}
        onClick={({ key }) => setSelectKey(key as MenuKey)}
        items={[
          { key: 'basic', label: 'Basic' },
          { key: 'security', label: 'Security' },
          { key: 'binding', label: 'Binding' },
          { key: 'notification', label: 'Notification' },
        ]}
      >
      </Menu>
      <div className="p-2">
        {ContentMap[selectKey]}
      </div>
    </div>
  )
}
