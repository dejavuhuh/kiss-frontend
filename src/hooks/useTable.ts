import type { QueryKey } from '@tanstack/react-query'
import type { TableProps } from 'antd'
import type { Key } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface Row {
  id: number
}

interface UseTableOptions<T extends Row> {
  queryKey: QueryKey
  queryFn: () => Promise<T[]>
  checkable?: (row: T) => boolean
}

export function useTable<T extends Row>({ queryKey, queryFn, checkable = () => true }: UseTableOptions<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

  const { refetch, data, isFetching } = useQuery({
    queryKey,
    queryFn,
    initialData: [],
  })

  const reload = () => {
    refetch()
  }

  return {
    data,
    reload,
    selectedRowKeys,
    setSelectedRowKeys,
    tableProps: {
      loading: isFetching,
      dataSource: data,
      rowKey: row => row.id,
      rowSelection: {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        columnWidth: 50,
        getCheckboxProps: row => ({ disabled: !checkable(row) }),
      },
      pagination: {
        showTotal: total => `共 ${total} 条`,
      },
    } as TableProps<T>,
  } as const
}
