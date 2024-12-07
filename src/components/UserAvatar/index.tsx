import type { AvatarProps } from 'antd'
import { useMinioObject } from '@/minio'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

type UserAvatarProps = {
  userId: number
} & AvatarProps

export function UserAvatar({ userId, ...props }: UserAvatarProps) {
  const options = {
    bucket: 'avatars',
    object: String(userId),
  }
  const url = useMinioObject(options)
  return <Avatar {...props} src={url} icon={<UserOutlined />} />
}
