import { EditOutlined, EllipsisOutlined, FileTextOutlined, PauseCircleOutlined, PauseOutlined, PlayCircleOutlined, QuestionCircleOutlined, RadiusSettingOutlined, SettingOutlined } from '@ant-design/icons'
import { ProCard, ProDescriptions } from '@ant-design/pro-components'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Switch, Tooltip, Typography } from 'antd'
import { Fragment } from 'react/jsx-runtime'

export const Route = createFileRoute('/_dashboard/system/jobs/')({
  component: JobsManagement,
})

function JobsManagement() {
  return (
    <div className="space-y-4">
      <div className="card">sss</div>
      <div className="grid grid-cols-3 gap-4">
        <ProCard
          title="清理过期会话"
          extra={<Switch checkedChildren="启用" unCheckedChildren="停用" />}
          actions={[
            <Tooltip key="play" title="立即执行">
              <PlayCircleOutlined />
            </Tooltip>,
            <SettingOutlined key="edit" />,
            <FileTextOutlined key="log" />,
          ]}
          boxShadow
        >
          <ProDescriptions column={1} size="small" colon={false}>
            <ProDescriptions.Item label="实现类">
              <Typography.Text copyable className="font-mono">ClearExpiredSessionJob</Typography.Text>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="CRON 表达式">
              <div className="flex items-center gap-2">
                0 0 3 * * ?
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
        <ProCard
          title="清理过期会话"
          extra={<Switch checkedChildren="启用" unCheckedChildren="停用" />}

          actions={[
            <PlayCircleOutlined key="play" />,
            <SettingOutlined key="edit" />,
            <FileTextOutlined key="log" />,
          ]}
          boxShadow
        >
          <ProDescriptions column={1} size="small" colon={false}>
            <ProDescriptions.Item label="实现类">
              <Typography.Text copyable className="font-mono">ClearExpiredSessionJob</Typography.Text>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="CRON 表达式">
              <div className="flex items-center gap-2">
                0 0 3 * * ?
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
        <ProCard
          title="清理过期会话"
          extra={<Switch checkedChildren="启用" unCheckedChildren="停用" />}
          actions={[
            <PlayCircleOutlined key="play" />,
            <SettingOutlined key="edit" />,
            <FileTextOutlined key="log" />,
          ]}
          boxShadow
        >
          <ProDescriptions column={1} size="small" colon={false}>
            <ProDescriptions.Item label="实现类">
              <Typography.Text copyable className="font-mono">ClearExpiredSessionJob</Typography.Text>
            </ProDescriptions.Item>
            <ProDescriptions.Item label="CRON 表达式">
              <div className="flex items-center gap-2">
                0 0 3 * * ?
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
      </div>
    </div>
  )
}
