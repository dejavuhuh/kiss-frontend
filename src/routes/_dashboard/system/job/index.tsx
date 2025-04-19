import { api } from '@/api'
import { CopyableText } from '@/components'
import { FileTextOutlined, PlayCircleOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { App, Switch, Tooltip } from 'antd'

export const Route = createFileRoute('/_dashboard/system/job/')({
  component: JobsManagement,
  loader: api.jobService.list,
})

function JobsManagement() {
  const jobs = Route.useLoaderData()

  const { message, modal } = App.useApp()

  const trigger = useMutation({
    mutationFn: api.jobService.trigger,
    onSuccess() {
      message.success('执行成功')
    },
  })

  return (
    <div className="space-y-4">
      <div className="card">sss</div>
      <div className="grid grid-cols-3 gap-4">
        {jobs.map(({ name, description, cron }) => (
          <ProCard
            key={name}
            title={description}
            extra={<Switch checkedChildren="启用" unCheckedChildren="停用" />}
            actions={[
              <Tooltip key="play" title="立即执行">
                <PlayCircleOutlined onClick={() => {
                  modal.confirm({
                    title: '确认执行',
                    content: '是否立即执行任务？',
                    onOk() {
                      return trigger.mutateAsync({ name })
                    },
                  })
                }}
                />
              </Tooltip>,
              <SettingOutlined key="edit" />,
              <FileTextOutlined key="log" />,
            ]}
            boxShadow
          >
            <ProDescriptions column={1} size="small" colon={false}>
              <ProDescriptions.Item label="实现类">
                <CopyableText>{name}</CopyableText>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="CRON 表达式">
                <div className="flex items-center gap-2">
                  {cron}
                  <Tooltip title="每天凌晨 3 点执行">
                    <QuestionCircleOutlined className="text-secondary cursor-pointer" />
                  </Tooltip>
                </div>
              </ProDescriptions.Item>
              <ProDescriptions.Item label="上一次执行时间">
                2021-10-01 03:00:00
              </ProDescriptions.Item>
              <ProDescriptions.Item label="下一次执行时间">
                2021-10-02 03:00:00
              </ProDescriptions.Item>
            </ProDescriptions>
          </ProCard>
        ))}
      </div>
    </div>
  )
}
