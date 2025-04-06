import type { Page } from '@/api/__generated/model/static'
import type { QueryKey } from '@tanstack/react-query'
import type { TableProps } from 'antd'
import type { Key } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface Row {
  id: number
}

interface PageRequest {
  pageIndex: number
  pageSize: number
}

interface UsePageableTableOptions<T extends Row> {
  queryKey: QueryKey
  queryFn: (pageRequest: PageRequest) => Promise<Page<T>>
}

export function usePageableTable<T extends Row>({ queryKey, queryFn }: UsePageableTableOptions<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const { refetch, data, isFetching } = useQuery({
    queryKey: [...queryKey, pageIndex, pageSize],
    queryFn: () => queryFn({
      pageIndex,
      pageSize,
    }),
  })

  const reload = () => {
    if (pageIndex > 0) {
      setPageIndex(0)
    }
    else {
      refetch()
    }
  }

  return {
    data,
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
        showTotal: total => `共 ${total} 条`,
        current: pageIndex + 1,
        pageSize,
        total: data?.totalRowCount,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange(page, pageSize) {
          setPageIndex(page - 1)
          setPageSize(pageSize)
        },
      },
    } as TableProps<T>,
  } as const
}
