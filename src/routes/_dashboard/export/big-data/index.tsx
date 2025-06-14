import type { ResponseOf } from '@/api'
import type { ExportTaskScene } from '@/api/__generated/model/enums'
import type { TableProps } from 'antd'
import { api } from '@/api'
import { useTable } from '@/hooks/useTable'
import { formatDateTime } from '@/utils'
import { ReloadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Badge, Button, InputNumber, Table, Typography } from 'antd'
import { useState } from 'react'
import { match } from 'ts-pattern'

export const Route = createFileRoute('/_dashboard/export/big-data/')({
  component: ExportBigData,
})

type ExportTaskView = ResponseOf<typeof api.exportTaskService.list>[number]

const ExportTaskSceneNames: Record<ExportTaskView['scene'], string> = {
  BIG_DATA: '海量数据导出',
}

function ExportBigData() {
  const { message } = App.useApp()
  const [count, setCount] = useState(1000000)

  const generateBigData = useMutation({
    mutationFn: api.bigDataService.generate,
    onSuccess() {
      message.success('生成成功')
    },
  })

  const scene: ExportTaskScene = 'BIG_DATA'

  const { tableProps, reload } = useTable({
    queryKey: ['export-tasks', scene],
    queryFn: () => api.exportTaskService.list({ scene }),
    showCheckbox: false,
  })

  const asyncExport = useMutation({
    mutationFn: api.bigDataService.createExportTask,
    onSuccess() {
      message.success('导出任务创建成功')
      reload()
    },
  })

  const columns: TableProps<ExportTaskView>['columns'] = [
    {
      title: '任务场景',
      dataIndex: 'scene',
      render: (_value, { scene }) => ExportTaskSceneNames[scene],
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      render(_, { status }) {
        return match(status)
          .with('PENDING', () => <Badge status="processing" text="进行中" />)
          .with('DONE', () => <Badge status="success" text="已完成" />)
          .with('FAILED', () => <Badge status="error" text="失败" />)
          .exhaustive()
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: formatDateTime,
    },
    {
      title: '操作',
      render(_, record) {
        return (
          <ExportTaskDownloadLink {...record} />
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex flex-col gap-4">
        <div className="flex items-center gap-3">
          生成
          <InputNumber
            min={0}
            value={count}
            onChange={value => value && setCount(value)}
            className="w-[120px]"
            step={1000000}
            formatter={value => `${value}`.replace(/\B(?=(?:\d{4})+(?!\d))/g, ',')}
            parser={value => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
          />
          条模拟数据
          <Button
            type="primary"
            onClick={() => generateBigData.mutate({ count })}
            loading={generateBigData.isPending}
          >
            一键生成
          </Button>
          <Button onClick={() => asyncExport.mutate()} loading={asyncExport.isPending}>
            异步导出
          </Button>
        </div>
        <div>
          <Typography.Title level={5} className="mb-1.5 flex items-center">
            <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
            操作指南
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            <ul className="mb-0 flex flex-col gap-1">
              <li>
                先点击
                <Typography.Text keyboard className="mx-0.5">一键生成</Typography.Text>
                按钮，生成指定数量的模拟数据
              </li>
              <li>
                等待模拟数据生成完成（100万数据大约需要等待8秒）
              </li>
              <li>
                再点击
                <Typography.Text keyboard className="mx-0.5">异步导出</Typography.Text>
                按钮
              </li>
            </ul>
          </Typography.Paragraph>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between mb-2.5">
          <Typography.Title level={5} className="mb-0 flex items-center">
            <div className="w-1.5 h-4 bg-primary rounded-xs mr-1.5" />
            导出任务列表
          </Typography.Title>
          <Button onClick={reload} icon={<ReloadOutlined />}>
            刷新列表
          </Button>
        </div>
        <Table columns={columns} {...tableProps} />
      </div>
    </div>
  )
}

export function ExportTaskDownloadLink({ id, status, scene }: ExportTaskView) {
  if (status !== 'DONE') {
    return null
  }

  async function download() {
    const url = await api.s3service.preSignedUrl({
      method: 'GET',
      bucket: 'export-task',
      objectName: `${id}`,
      fileName: `${ExportTaskSceneNames[scene]}.xlsx`,
    })

    const link = document.createElement('a')
    link.href = url
    link.click()
  }

  return <Typography.Link onClick={download}>下载</Typography.Link>
}
