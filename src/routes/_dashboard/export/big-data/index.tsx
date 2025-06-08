import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, InputNumber, Typography } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/export/big-data/')({
  component: ExportBigData,
})

function ExportBigData() {
  const { message } = App.useApp()
  const [count, setCount] = useState(1000000)

  const generateBigData = useMutation({
    mutationFn: api.bigDataService.generate,
    onSuccess() {
      message.success('生成成功')
    },
  })

  return (
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
        <Button>
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
  )
}
