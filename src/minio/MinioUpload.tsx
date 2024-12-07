import type { UploadProps } from 'antd'
import api from '@/api'
import { useQueryClient } from '@tanstack/react-query'
import { Upload } from 'antd'

type MinioUploadProps = {
  bucket: string
  object: string
} & UploadProps

export function MinioUpload({ bucket, object, ...props }: MinioUploadProps) {
  const queryClient = useQueryClient()
  return (
    <Upload
      {...props}
      customRequest={async ({ file }) => {
        const uploadUrl = await api.minioService.getPresignedUrl({ method: 'PUT', bucket, object })
        await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
        })
        await queryClient.invalidateQueries({
          queryKey: ['minio', bucket, object],
        })
      }}
    />
  )
}
