import type { Page, PageParam } from '@/api/__generated/model/static'
import type { Data } from '@/types'
import type { ProTableProps } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'

interface TableProps<T extends Data, S extends Data> {
  request: (options: { pageParam: PageParam, specification: S }) => Promise<Page<T>>
}

export function Table<T extends Data, S extends Data>(
  { request, ...props }: Omit<ProTableProps<T, S>, 'request'> & TableProps<T, S>,
) {
  return (
    <ProTable<T, S>
      {...props}
      request={async (params) => {
        const { current = 1, pageSize = 10, ...specification } = params
        const page = await request({
          pageParam: {
            pageIndex: current - 1,
            pageSize,
          },
          specification: specification as S,
        })
        return {
          data: page.rows,
          total: page.totalRowCount,
        }
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
    />
  )
}
