import type { ComponentProps } from 'react'
import { S3Upload } from './S3Upload'

type SingleS3UploadProps = Omit<ComponentProps<typeof S3Upload>, 'value' | 'onChange'> & {
  value?: string
  onChange?: (value: string | undefined) => void
}

export function SingleS3Upload({ value, onChange, ...props }: SingleS3UploadProps) {
  return (
    <S3Upload
      value={value ? [value] : []}
      onChange={(values) => {
        // 单文件上传，只取第一个文件，如果没有文件则为 undefined
        onChange?.(values[0] || undefined)
      }}
      max={1}
      {...props}
    />
  )
}
