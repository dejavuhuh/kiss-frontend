import useAuthentication from '@/authentication'
import { UserAvatar } from '@/components'
import { MinioUpload } from '@/minio'
import { UploadOutlined } from '@ant-design/icons'
import { ProForm, ProFormText } from '@ant-design/pro-components'
import { Button, Typography } from 'antd'

function Avatar() {
  const user = useAuthentication(state => state.user)
  return (
    <div className="flex flex-col gap-4 items-center">
      <UserAvatar userId={user.id} size={96} />
      <MinioUpload
        bucket="avatars"
        object={String(user.id)}
        showUploadList={false}
      >
        <Button>
          <UploadOutlined />
          Upload
        </Button>
      </MinioUpload>
    </div>
  )
}

export default () => {
  return (
    <>
      <Typography.Title level={3}>Basic</Typography.Title>
      <div className="flex flex-row gap-8">
        <ProForm
          layout="vertical"
          requiredMark={false}
          submitter={{
            searchConfig: {
              submitText: 'Update',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
        >
          <ProFormText
            width="md"
            name="username"
            label="Username"
            rules={[{ required: true }]}
          />
        </ProForm>
        <Avatar />
      </div>
    </>
  )
}
