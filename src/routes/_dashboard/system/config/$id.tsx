import { api } from '@/api'
import { MonacoEditor } from '@/components'
import { isValidYaml } from '@/utils/yaml'
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, FileTextOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons'
import { ModalForm, ProFormTextArea } from '@ant-design/pro-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Dropdown, Tooltip, Typography } from 'antd'
import useApp from 'antd/es/app/useApp'
import { useState } from 'react'
import { HistoryDrawer } from './components'

export const Route = createFileRoute('/_dashboard/system/config/$id')({
  component: ConfigDetails,
  params: {
    parse: ({ id }) => ({ id } as unknown as { id: number }),
  },
})

function ConfigDetails() {
  const queryClient = useQueryClient()
  const navigate = Route.useNavigate()
  const { id } = Route.useParams()
  const { message, modal } = useApp()

  const [currentYaml, setCurrentYaml] = useState<string>()
  const [saveModalOpen, setSaveModalOpen] = useState(false)

  const { data, refetch } = useQuery({
    queryKey: ['config-details', id],
    async queryFn() {
      const data = await api.configService.get({ id })
      setCurrentYaml(data.yaml)
      return data
    },
  })

  const saveYaml = useMutation({
    mutationFn: api.configService.saveYaml,
    onSuccess() {
      message.success('保存成功')
      queryClient.invalidateQueries({
        queryKey: ['config', id, 'histories'],
      })
      refetch()
    },
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-4">
        <Typography.Title level={5} className="mb-0 font-mono text-base">
          <FileTextOutlined className="mr-1" />
          {data.name}
          .yaml
        </Typography.Title>
        <div className="text-secondary space-x-1">
          <UserOutlined />
          <span>{data.creator.username}</span>
        </div>
        <div className="text-secondary space-x-1">
          <ClockCircleOutlined />
          <span>{new Date(data.createdTime).toLocaleString()}</span>
        </div>
        <div className="text-secondary space-x-1">
          <EditOutlined />
          <span>{new Date(data.createdTime).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {currentYaml !== data.yaml && (
            <>
              <Button
                onClick={() => {
                  if (currentYaml) {
                    if (!isValidYaml(currentYaml)) {
                      message.error(
                        <>
                          <span className="font-mono mr-1">yaml</span>
                          格式错误
                        </>,
                      )
                      return
                    }
                  }
                  setSaveModalOpen(true)
                }}
                icon={<SaveOutlined />}
                type="primary"
              >
                保存
              </Button>
              <ModalForm<{ reason: string }>
                open={saveModalOpen}
                onOpenChange={setSaveModalOpen}
                title="保存配置"
                width={500}
                modalProps={{ destroyOnClose: true }}
                onFinish={async ({ reason }) => {
                  await saveYaml.mutateAsync({
                    id,
                    body: {
                      yaml: currentYaml,
                      version: data.version,
                      reason,
                    },
                  })
                  return true
                }}
              >
                <ProFormTextArea
                  name="reason"
                  placeholder="请填写描述信息"
                  rules={[{ required: true, message: '请填写描述信息' }]}
                />
              </ModalForm>
            </>
          )}
          <HistoryDrawer id={id} />
          <Dropdown
            menu={{ items: [
              {
                key: 'delete',
                label: '删除配置',
                danger: true,
                icon: <DeleteOutlined />,
                onClick() {
                  modal.confirm({
                    title: '删除配置',
                    content: (
                      <>
                        确定要删除
                        <span className="font-bold text-primary mx-1 font-mono">
                          {data.name}
                          .yaml
                        </span>
                        配置吗？
                      </>
                    ),
                    okButtonProps: {
                      danger: true,
                    },
                    async onOk() {
                      await api.configService.delete({ id })
                      message.success('删除成功')
                      await navigate({ to: '/system/config' })
                      queryClient.invalidateQueries({
                        queryKey: ['config'],
                      })
                    },
                  })
                },
              },
            ] }}
            trigger={['click']}
          >
            <Tooltip title="更多">
              <Button icon={<EllipsisOutlined />} />
            </Tooltip>
          </Dropdown>
        </div>
      </div>
      <MonacoEditor
        className="flex-1"
        language="yaml"
        value={data.yaml}
        tabSize={2}
        onChange={setCurrentYaml}
      />
    </div>
  )
}
