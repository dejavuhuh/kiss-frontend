import { api } from '@/api'
import { MonacoDiffEditor } from '@/components/MonacoDiffEditor'
import { formatDateTime } from '@/utils'
import { ClockCircleOutlined, FileTextOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons'
import { DrawerForm } from '@ant-design/pro-components'
import { useQuery } from '@tanstack/react-query'
import { Button, Modal, Timeline, Tooltip, Typography } from 'antd'
import { useState } from 'react'

interface HistoryDrawerProps {
  id: number
}

export function HistoryDrawer({ id }: HistoryDrawerProps) {
  const { data = [] } = useQuery({
    queryKey: ['config', id, 'histories'],
    queryFn: () => api.configService.listHistories({ id }),
  })

  const [diff, setDiff] = useState<{ original?: string, modified?: string }>()

  return (
    <DrawerForm
      title="修改历史"
      width={500}
      submitter={false}
      trigger={<Button icon={<HistoryOutlined />}>修改历史</Button>}
    >
      <Timeline
        mode="left"
        items={data.map(({ creator, createdTime, reason, yaml }, index) => ({
          color: 'blue',
          children: (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Typography.Title level={5} className="mb-0">
                  {reason}
                </Typography.Title>
                <Tooltip title="查看差异">
                  <Typography.Link onClick={() => setDiff({ modified: yaml, original: data[index + 1]?.yaml })}>
                    <FileTextOutlined />
                  </Typography.Link>
                </Tooltip>
              </div>
              <div className="text-secondary space-x-1">
                <UserOutlined />
                <span>{creator.displayName}</span>
              </div>
              <div className="text-secondary space-x-1">
                <ClockCircleOutlined />
                <span>{formatDateTime(createdTime)}</span>
              </div>
            </div>
          ),
        }))}
      />
      <Modal
        width="100vw"
        style={{ top: 20 }}
        title="版本差异"
        open={!!diff}
        footer={false}
        onCancel={() => setDiff(undefined)}
      >
        <div className="flex items-center mb-2">
          <span className="text-[13px] font-semibold text-secondary">上一版本</span>
          <span className="ml-auto font-semibold text-[13px] text-primary">当前版本</span>
        </div>
        {diff && (
          <MonacoDiffEditor
            original={diff.original}
            modified={diff.modified}
            language="yaml"
            className="h-[calc(100vh-160px)] w-full"
          />
        )}
      </Modal>
    </DrawerForm>
  )
}
