import type { ComponentProps } from 'react'
import { api } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'antd'

type S3ImageProps = {
  bucket: string
  objectName: string
} & ComponentProps<typeof Image>

export function S3Image({ bucket, objectName, ...props }: S3ImageProps) {
  const { data } = useQuery({
    queryKey: ['s3', bucket, objectName],
    queryFn: () => api.s3service.preSignedUrl({
      method: 'GET',
      bucket,
      objectName,
    }),
  })

  return <Image src={data} {...props} />
}
