import type { Page } from '@/api/__generated/model/static'
import type { TableProps } from 'antd'
import type { Key } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface QueryOptions {
  pageIndex: number
  pageSize: number
}

interface Row {
  id: number
}

interface UseTableOptions<T extends Row> {
  queryKey: string
  queryFn: (options: QueryOptions) => Promise<Page<T>>
}

export function useTable<T extends Row>({ queryKey, queryFn }: UseTableOptions<T>) {
  const [pageIndex, setPageIndex] = useState(0)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const { refetch, data, isFetching } = useQuery({
    queryKey: [queryKey, pageIndex],
    queryFn: () => queryFn({ pageIndex, pageSize: 10 }),
  })

  const reload = () => {
    if (pageIndex !== 0) {
      setPageIndex(0)
    }
    else {
      refetch()
    }
  }

  return {
    reload,
    selectedRowKeys,
    setSelectedRowKeys,
    tableProps: {
      loading: isFetching,
      dataSource: data?.rows,
      rowKey: row => row.id,
      rowSelection: {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        columnWidth: 50,
      },
      pagination: {
        total: data?.totalRowCount,
        onChange: page => setPageIndex(page - 1),
        current: pageIndex + 1,
        showTotal: total => `共 ${total} 条`,
      },
    } as TableProps<T>,
  } as const
}
