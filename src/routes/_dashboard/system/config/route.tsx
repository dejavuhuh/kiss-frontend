import type { RequestOf } from '@/api'
import { api } from '@/api'
import { cn } from '@/utils'
import { FileOutlined, PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormText } from '@ant-design/pro-components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { App, Button, Empty } from 'antd'

export const Route = createFileRoute('/_dashboard/system/config')({
  component: RouteComponent,
})

type ConfigInput = RequestOf<typeof api.configService.create>['body']

function RouteComponent() {
  const navigate = Route.useNavigate()
  const params = Route.useParams() as { id?: number }
  const { message } = App.useApp()

  const { data, refetch } = useQuery({
    queryKey: ['config'],
    async queryFn() {
      const data = await api.configService.list()
      if (params.id === undefined && data.length > 0) {
        navigate({ to: '$id', params: { id: data[0].id } })
      }
      return data
    },
  })

  const createConfig = useMutation({
    mutationFn: api.configService.create,
    onSuccess() {
      message.success('创建成功')
      refetch()
    },
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex h-full gap-4">
      <div className="card w-56 flex flex-col">
        {data.map(({ id, name }) => (
          <Button
            key={id}
            className={cn(
              'flex items-center justify-start gap-2',
              'text-secondary transition-colors font-medium text-sm',
              'px-2 py-1.5 mb-2',
              id === Number(params.id) ? 'text-primary bg-bg-text-hover' : 'hover:text-text',
            )}
            onClick={() => navigate({ to: '$id', params: { id } })}
            type="text"
            block
          >
            <FileOutlined />
            <span className="font-mono">
              {name}
              .yaml
            </span>
          </Button>
        ))}
        <ModalForm<ConfigInput>
          width={500}
          title="新建配置"
          trigger={(
            <Button type="dashed" block icon={<PlusOutlined />}>
              新建配置
            </Button>
          )}
          modalProps={{
            destroyOnClose: true,
          }}
          isKeyPressSubmit
          onFinish={async (body) => {
            await createConfig.mutateAsync({ body })
            return true
          }}
        >
          <ProFormText
            label="配置名称"
            name="name"
            fieldProps={{
              addonAfter: <span className="font-mono">.yaml</span>,
            }}
            rules={[{ required: true }]}
          />
        </ModalForm>
      </div>
      {data.length === 0
        ? <NoData />
        : (
            <div className="flex-1 card">
              <Outlet />
            </div>
          )}
    </div>
  )
}

function NoData() {
  return (
    <div className="flex-1 card flex items-center justify-center">
      <Empty description="暂无配置" />
    </div>
  )
}
