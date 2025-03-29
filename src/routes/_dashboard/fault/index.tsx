import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Button, Divider } from 'antd'

export const Route = createFileRoute('/_dashboard/fault/')({
  component: FaultDrill,
})

function FaultDrill() {
  const { message } = App.useApp()

  const highCpu = useMutation({
    mutationFn: api.faultService.highCpu,
    onSuccess() {
      message.success('请求成功')
    },
  })

  const cpuIntensive = useMutation({
    mutationFn: api.faultService.cpuIntensive,
    onSuccess() {
      message.success('请求成功')
    },
  })

  return (
    <div className="card space-x-4">
      <Button
        type="primary"
        onClick={() => highCpu.mutate()}
        loading={highCpu.isPending}
      >
        CPU 使用率飙升
      </Button>
      <Button
        type="primary"
        onClick={() => cpuIntensive.mutate()}
        loading={cpuIntensive.isPending}
      >
        CPU 密集型请求
      </Button>
      <Divider />
      <Button type="primary">内存泄露</Button>
      <Button type="primary">内存溢出</Button>
    </div>
  )
}
