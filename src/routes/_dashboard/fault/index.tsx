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

  const serverError = useMutation({
    mutationFn: api.faultService.serverError,
    onSuccess() {
      message.success('请求成功')
    },
  })

  return (
    <div className="card space-x-4">
      <Button
        onClick={() => highCpu.mutate()}
        loading={highCpu.isPending}
      >
        CPU 使用率飙升
      </Button>
      <Button
        onClick={() => cpuIntensive.mutate()}
        loading={cpuIntensive.isPending}
      >
        CPU 密集型请求
      </Button>
      <Divider />
      <Button>内存泄露</Button>
      <Button>内存溢出</Button>
      <Divider />
      <Button
        onClick={() => serverError.mutate({
          foo: 'abc',
          bar: 123,
          body: {
            foo: 'def',
            bar: 456,
          },
        })}
        loading={serverError.isPending}
      >
        服务端异常
      </Button>
    </div>
  )
}
