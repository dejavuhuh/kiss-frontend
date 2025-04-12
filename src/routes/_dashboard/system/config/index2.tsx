import { MonacoEditor } from '@/components'
import { FileOutlined, HistoryOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Divider, Empty, List, Segmented, Timeline, Typography } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/system/config/index2')({
  component: ConfigCenter,
})

// Types for configuration files and history
interface ConfigFile {
  id: string
  name: string
  description: string
  content: string
  lastModified: string
}

interface ConfigHistory {
  id: string
  configId: string
  content: string
  timestamp: string
  user: string
  comment: string
}

// Mock data for configuration files
const mockConfigFiles: ConfigFile[] = [
  {
    id: '1',
    name: 'application.yaml',
    description: '主应用配置文件',
    content: `# 应用配置
app:
  name: KISS Platform
  version: 1.0.0

# 服务器配置
server:
  port: 8000
  host: localhost

# 数据库配置
database:
  url: jdbc:mysql://localhost:3306/kiss
  username: root
  password: password
  driver-class-name: com.mysql.cj.jdbc.Driver

# 日志配置
logging:
  level:
    root: INFO
    org.springframework: WARN`,
    lastModified: '2023-10-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'security.yaml',
    description: '安全配置文件',
    content: `# 安全配置
security:
  jwt:
    secret: your-secret-key
    expiration: 86400000
  cors:
    allowed-origins: '*'
    allowed-methods: GET,POST,PUT,DELETE
    allowed-headers: '*'
  rate-limit:
    enabled: true
    limit: 100
    duration: 60`,
    lastModified: '2023-09-20T10:15:00Z',
  },
  {
    id: '3',
    name: 'cache.yaml',
    description: '缓存配置文件',
    content: `# 缓存配置
cache:
  type: redis
  redis:
    host: localhost
    port: 6379
    password: null
    database: 0
  ttl: 3600
  prefix: 'kiss:'`,
    lastModified: '2023-11-05T09:45:00Z',
  },
  {
    id: '4',
    name: 'storage.yaml',
    description: '存储配置文件',
    content: `# 存储配置
storage:
  type: s3
  s3:
    endpoint: https://s3.amazonaws.com
    region: us-east-1
    bucket: kiss-storage
    access-key: your-access-key
    secret-key: your-secret-key
  local:
    path: /data/files
  max-file-size: 10MB`,
    lastModified: '2023-12-01T16:20:00Z',
  },
  {
    id: '5',
    name: 'notification.yaml',
    description: '通知配置文件',
    content: `# 通知配置
notification:
  email:
    enabled: true
    host: smtp.example.com
    port: 587
    username: noreply@example.com
    password: email-password
    from: KISS Platform <noreply@example.com>
  sms:
    enabled: false
    provider: aliyun
    access-key: your-access-key
    secret-key: your-secret-key
    sign-name: KISS`,
    lastModified: '2024-01-10T11:30:00Z',
  },
]

// Mock data for configuration history
const mockConfigHistory: Record<string, ConfigHistory[]> = {
  1: [
    {
      id: '101',
      configId: '1',
      content: `# 应用配置
app:
  name: KISS Platform
  version: 1.0.0

# 服务器配置
server:
  port: 8000
  host: localhost

# 数据库配置
database:
  url: jdbc:mysql://localhost:3306/kiss
  username: root
  password: password
  driver-class-name: com.mysql.cj.jdbc.Driver

# 日志配置
logging:
  level:
    root: INFO
    org.springframework: WARN`,
      timestamp: '2023-10-15T14:30:00Z',
      user: '张三',
      comment: '更新数据库配置',
    },
    {
      id: '102',
      configId: '1',
      content: `# 应用配置
app:
  name: KISS Platform
  version: 0.9.0

# 服务器配置
server:
  port: 8080
  host: localhost

# 数据库配置
database:
  url: jdbc:mysql://localhost:3306/kiss_dev
  username: dev
  password: dev_password
  driver-class-name: com.mysql.cj.jdbc.Driver

# 日志配置
logging:
  level:
    root: DEBUG
    org.springframework: INFO`,
      timestamp: '2023-09-10T09:15:00Z',
      user: '李四',
      comment: '初始配置',
    },
  ],
  2: [
    {
      id: '201',
      configId: '2',
      content: `# 安全配置
security:
  jwt:
    secret: your-secret-key
    expiration: 86400000
  cors:
    allowed-origins: '*'
    allowed-methods: GET,POST,PUT,DELETE
    allowed-headers: '*'
  rate-limit:
    enabled: true
    limit: 100
    duration: 60`,
      timestamp: '2023-09-20T10:15:00Z',
      user: '王五',
      comment: '增加速率限制配置',
    },
    {
      id: '202',
      configId: '2',
      content: `# 安全配置
security:
  jwt:
    secret: old-secret-key
    expiration: 3600000
  cors:
    allowed-origins: 'http://localhost:3000'
    allowed-methods: GET,POST
    allowed-headers: 'Content-Type,Authorization'`,
      timestamp: '2023-08-05T16:45:00Z',
      user: '赵六',
      comment: '初始安全配置',
    },
  ],
  3: [
    {
      id: '301',
      configId: '3',
      content: `# 缓存配置
cache:
  type: redis
  redis:
    host: localhost
    port: 6379
    password: null
    database: 0
  ttl: 3600
  prefix: 'kiss:'`,
      timestamp: '2023-11-05T09:45:00Z',
      user: '张三',
      comment: '更新缓存前缀',
    },
  ],
  4: [
    {
      id: '401',
      configId: '4',
      content: `# 存储配置
storage:
  type: s3
  s3:
    endpoint: https://s3.amazonaws.com
    region: us-east-1
    bucket: kiss-storage
    access-key: your-access-key
    secret-key: your-secret-key
  local:
    path: /data/files
  max-file-size: 10MB`,
      timestamp: '2023-12-01T16:20:00Z',
      user: '李四',
      comment: '配置S3存储',
    },
  ],
  5: [
    {
      id: '501',
      configId: '5',
      content: `# 通知配置
notification:
  email:
    enabled: true
    host: smtp.example.com
    port: 587
    username: noreply@example.com
    password: email-password
    from: KISS Platform <noreply@example.com>
  sms:
    enabled: false
    provider: aliyun
    access-key: your-access-key
    secret-key: your-secret-key
    sign-name: KISS`,
      timestamp: '2024-01-10T11:30:00Z',
      user: '王五',
      comment: '添加短信通知配置',
    },
    {
      id: '502',
      configId: '5',
      content: `# 通知配置
notification:
  email:
    enabled: true
    host: smtp.example.com
    port: 587
    username: noreply@example.com
    password: email-password
    from: KISS Platform <noreply@example.com>`,
      timestamp: '2023-12-15T14:10:00Z',
      user: '赵六',
      comment: '初始邮件通知配置',
    },
  ],
}

function ConfigCenter() {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'content' | 'history'>('content')

  // Get the selected config file
  const selectedConfig = selectedConfigId
    ? mockConfigFiles.find(config => config.id === selectedConfigId)
    : null

  // Get the history for the selected config file
  const configHistory = selectedConfigId ? mockConfigHistory[selectedConfigId] || [] : []

  return (
    <div className="flex h-full gap-4">
      {/* Left sidebar with config file list */}
      <div className="w-64 card overflow-auto">
        <Typography.Title level={5} className="mb-4">配置文件列表</Typography.Title>
        <List
          dataSource={mockConfigFiles}
          renderItem={item => (
            <List.Item
              className={`cursor-pointer hover:bg-gray-50 rounded px-2 ${selectedConfigId === item.id ? 'bg-gray-100' : ''}`}
              onClick={() => {
                setSelectedConfigId(item.id)
                setActiveTab('content')
              }}
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <FileOutlined />
                  <Typography.Text strong>{item.name}</Typography.Text>
                </div>
                <Typography.Text type="secondary" className="text-xs mt-1">
                  {item.description}
                </Typography.Text>
                <Typography.Text type="secondary" className="text-xs mt-1">
                  最后修改:
                  {' '}
                  {new Date(item.lastModified).toLocaleString()}
                </Typography.Text>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Right content area */}
      <div className="flex-1 card overflow-hidden">
        {selectedConfig
          ? (
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <Typography.Title level={4} className="mb-0">{selectedConfig.name}</Typography.Title>
                    <Typography.Text type="secondary">{selectedConfig.description}</Typography.Text>
                  </div>
                  <Segmented
                    options={[
                      {
                        label: '配置内容',
                        value: 'content',
                        icon: <FileOutlined />,
                      },
                      {
                        label: '修改历史',
                        value: 'history',
                        icon: <HistoryOutlined />,
                      },
                    ]}
                    value={activeTab}
                    onChange={value => setActiveTab(value as 'content' | 'history')}
                  />
                </div>

                <Divider className="my-2" />

                {activeTab === 'content'
                  ? (
                      <div className="flex-1 overflow-hidden">
                        <MonacoEditor
                          language="yaml"
                          value={selectedConfig.content}
                          className="h-full"
                        />
                      </div>
                    )
                  : (
                      <div className="flex-1 overflow-auto p-4">
                        {configHistory.length > 0
                          ? (
                              <Timeline
                                mode="left"
                                items={configHistory.map(history => ({
                                  children: (
                                    <div className="mb-4">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Typography.Text strong>{history.user}</Typography.Text>
                                        <Typography.Text type="secondary" className="text-xs">
                                          {new Date(history.timestamp).toLocaleString()}
                                        </Typography.Text>
                                      </div>
                                      <Typography.Text>{history.comment}</Typography.Text>
                                      <div className="mt-2 border rounded p-2 bg-gray-50">
                                        <MonacoEditor
                                          language="yaml"
                                          value={history.content}
                                          className="h-64"
                                        />
                                      </div>
                                    </div>
                                  ),
                                }))}
                              />
                            )
                          : (
                              <Empty description="暂无历史记录" />
                            )}
                      </div>
                    )}
              </div>
            )
          : (
              <div className="flex h-full items-center justify-center">
                <Empty description="请选择一个配置文件" />
              </div>
            )}
      </div>
    </div>
  )
}
