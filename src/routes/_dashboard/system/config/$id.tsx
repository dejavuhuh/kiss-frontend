import { api } from '@/api'
import { MonacoEditor } from '@/components'
import { ClockCircleOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, FileTextOutlined, HistoryOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Dropdown, Tooltip, Typography } from 'antd'
import useApp from 'antd/es/app/useApp'
import yaml from 'js-yaml'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/system/config/$id')({
  component: ConfigDetails,
  params: {
    parse: ({ id }) => ({ id } as unknown as { id: number }),
  },
})

function ConfigDetails() {
  const { id } = Route.useParams()
  const { message } = useApp()

  const [currentYaml, setCurrentYaml] = useState<string>()

  const { data, refetch } = useQuery({
    queryKey: ['config', id],
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
      refetch()
    },
  })

  const handleSave = () => {
    if (currentYaml === undefined) {
      return
    }
    try {
      yaml.load(currentYaml)
    }

    catch (e) {
      console.error(e)
      message.error(
        <>
          <span className="font-mono mr-1">yaml</span>
          格式错误
        </>,
      )
      return
    }
    saveYaml.mutate({ id, body: currentYaml })
  }

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
            <Button
              icon={<SaveOutlined />}
              type="primary"
              onClick={handleSave}
              loading={saveYaml.isPending}
            >
              保存
            </Button>
          )}
          <Button icon={<HistoryOutlined />}>修改历史</Button>
          <Dropdown
            menu={{ items: [
              {
                key: 'delete',
                label: '删除配置',
                danger: true,
                icon: <DeleteOutlined />,
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
