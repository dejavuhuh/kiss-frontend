import { api } from '@/api'
import { PageLoading } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { Empty, Spin, Typography } from 'antd'

export function ApiList({ id }: { id: number }) {
  const { data = [], isFetching } = useQuery({
    queryKey: ['permissions', id, 'unbound-apis'],
    queryFn: () => api.permissionService.unboundApis({ id }),
  })

  return (
    <div className="px-4 py-2.5 flex justify-center items-center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={isFetching ? <Spin /> : '暂无接口'}
        children={isFetching ? null : <Typography.Link>去添加</Typography.Link>}
      />
    </div>
  )
}
