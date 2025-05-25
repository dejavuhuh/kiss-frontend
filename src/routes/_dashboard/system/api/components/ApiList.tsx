import { Empty, Typography } from 'antd'

export function ApiList({ permissionId }: { permissionId: number }) {
  return (
    <div className="px-4 py-2.5 flex justify-center items-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无接口"
      >
        <Typography.Link>去添加</Typography.Link>
      </Empty>
    </div>
  )
}
