import { api } from '@/api'
import { ClockCircleOutlined, CodeOutlined, CodepenOutlined, CodeSandboxOutlined, ContainerOutlined, DiffOutlined, EditOutlined, EyeOutlined, FileTextOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'
import { DrawerForm } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { Button, Timeline, Tooltip, Typography } from 'antd'

interface HistoryDrawerProps {
  id: number
}

export function HistoryDrawer({ id }: HistoryDrawerProps) {
  const { data = [] } = useQuery({
    queryKey: ['config', id, 'histories'],
    queryFn: () => api.configService.listHistories({ id }),
  })

  return (
    <DrawerForm
      title="修改历史"
      width={500}
      submitter={false}
      trigger={<Button icon={<HistoryOutlined />}>修改历史</Button>}
    >
      <Timeline
        mode="left"
        items={data.map(({ id, creator, createdTime, reason }) => ({
          color: 'blue',
          children: (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Typography.Title level={5} className="mb-0">
                  {reason}
                </Typography.Title>
                <Tooltip title="查看差异">
                  <Typography.Link>
                    <FileTextOutlined />
                  </Typography.Link>
                </Tooltip>
              </div>
              <div className="text-secondary space-x-1">
                <UserOutlined />
                <span>{creator.username}</span>
              </div>
              <div className="text-secondary space-x-1">
                <ClockCircleOutlined />
                <span>{new Date(createdTime).toLocaleString()}</span>
              </div>
            </div>
          ),
        }))}
      />
    </DrawerForm>
  )
}
