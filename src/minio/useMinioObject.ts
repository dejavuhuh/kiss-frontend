import api from '@/api'
import { useQuery } from '@tanstack/react-query'

interface Options {
  bucket: string
  object: string
}

export function useMinioObject({ bucket, object }: Options) {
  const { data } = useQuery({
    queryKey: ['minio', bucket, object],
    queryFn: () => api.minioService.getPresignedUrl({ method: 'GET', bucket, object }),
  })

  return data
}
