import type { ResponseOf } from '@/api'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { CopyableText, HttpMethodTag, SearchHighlight } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { App, Button, Empty, Input, Spin, Table, Tag, Typography } from 'antd'
import { useState } from 'react'

type ApiView = ResponseOf<typeof api.permissionService.boundApis>[number]

export function ApiList({ id }: { id: number }) {
  const { message } = App.useApp()
  const [keyword, setKeyword] = useState<string>('')
  const [highlight, setHighlight] = useState(false)

  const boundApis = useQuery({
    queryKey: ['permissions', id, 'bound-apis'],
    queryFn: () => api.permissionService.boundApis({ id }),
    initialData: [],
  })

  const unbindApi = useMutation({
    mutationFn: api.permissionService.unbindApi,
    onSuccess: () => {
      message.success('移除成功')
      boundApis.refetch()
    },
  })

  if (boundApis.data.length === 0) {
    return (
      <div className="px-4 py-2.5 flex justify-center items-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={boundApis.isFetching ? <Spin /> : '暂无接口'}
          children={boundApis.isFetching ? null : <Typography.Link>去添加</Typography.Link>}
        />
      </div>
    )
  }

  const columns: TableProps<ApiView>['columns'] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      render(text) {
        return highlight ? <SearchHighlight text={text} keyword={keyword} /> : text
      },
    },
    {
      title: '接口地址',
      dataIndex: 'path',
      render: (text, { method }) => (
        <div className="flex items-center gap-2.5">
          <HttpMethodTag method={method} />
          <CopyableText copyText={text}>
            {highlight ? <SearchHighlight text={text} keyword={keyword} /> : text}
          </CopyableText>
        </div>
      ),
    },
    {
      title: '接口分组',
      dataIndex: ['group', 'name'],
    },
    {
      title: '操作',
      render(_, row) {
        return (
          <Typography.Link type="danger" onClick={() => unbindApi.mutate({ id, apiId: row.id })}>移除</Typography.Link>
        )
      },
    },
  ]

  return (
    <div className="px-4 py-3.5 flex flex-col gap-3">
      <div className="flex justify-between">
        <Input.Search
          className="w-xs"
          placeholder="接口名称/地址"
          onSearch={(value) => {
            setKeyword(value)
            setHighlight(true)
          }}
          onChange={() => {
            setHighlight(false)
          }}
        />
        <Button type="dashed" icon={<PlusOutlined />}>绑定接口</Button>
      </div>
      <Table
        loading={boundApis.isFetching}
        dataSource={boundApis.data.filter(row => !keyword || row.name.includes(keyword) || row.path.includes(keyword))}
        columns={columns}
        pagination={false}
        rowKey={row => row.id}
        size="small"
        bordered
      />
    </div>
  )
}
