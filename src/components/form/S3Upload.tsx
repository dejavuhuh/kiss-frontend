import type { ProFormUploadButtonProps } from '@ant-design/pro-components'
import type { UploadFile } from 'antd'
import { api } from '@/api'
import { ProFormUploadButton } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'

type S3UploadProps = Omit<ProFormUploadButtonProps, 'value' | 'onChange'> & {
  value: string[]
  onChange: (value: string[]) => void
  bucket: string
}

export function S3Upload({ value, onChange, bucket, ...props }: S3UploadProps) {
  const [fileList, setFileList] = useState<UploadFile<string>[]>([])

  useEffect(() => {
    setFileList(
      value.map(objectName => ({
        uid: objectName,
        name: objectName,
        status: 'done',
        response: objectName,
      })),
    )
  }, [value])

  return (
    <ProFormUploadButton
      value={fileList}
      onChange={({ fileList }) => {
        const allDone = fileList.every(file => file.status === 'done')
        if (allDone) {
          onChange(fileList.map(file => file.response as string))
        }
        else {
          setFileList(fileList)
        }
      }}
      fieldProps={{
        async customRequest({ file, onProgress, onSuccess }) {
          const method = 'PUT'
          const objectName = crypto.randomUUID().replace(/-/g, '')

          const uploadUrl = await api.s3service.preSignedUrl({
            bucket,
            method,
            objectName,
          })

          const xhr = new XMLHttpRequest()
          xhr.open(method, uploadUrl)
          xhr.upload.addEventListener('progress', (event) => {
            const percent = Math.round((event.loaded / event.total) * 100)
            onProgress?.({ percent })
          })

          xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              onSuccess?.(objectName)
            }
          })

          xhr.send(file)
        },
        async onRemove(file) {
          const objectName = file.response as string
          const deleteUrl = await api.s3service.preSignedUrl({
            bucket,
            method: 'DELETE',
            objectName,
          })
          await fetch(deleteUrl, {
            method: 'DELETE',
          })
          return true
        },
        async onPreview(file) {
          const objectName = file.response as string
          const downloadUrl = await api.s3service.preSignedUrl({
            bucket,
            method: 'GET',
            objectName,
          })
          window.open(downloadUrl)
        },
      }}
      {...props}
    />
  )
}
