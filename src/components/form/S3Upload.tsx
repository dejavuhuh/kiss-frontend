import type { ProFormUploadButtonProps } from '@ant-design/pro-components'
import type { UploadFile } from 'antd'
import { api } from '@/api'
import { EMPTY_ARRAY } from '@/constants'
import { ProFormUploadButton } from '@ant-design/pro-components'
import { Image } from 'antd'
import ImgCrop from 'antd-img-crop'
import { memo, useEffect, useState } from 'react'
import ConditionalWrapper from '../ConditionalWrapper'

type S3UploadProps = Omit<ProFormUploadButtonProps, 'value' | 'onChange'> & {
  value?: string[]
  onChange?: (value: string[]) => void
  bucket: string
  crop?: boolean
}

const ProFormUploadButtonWrapper = memo<
  ProFormUploadButtonProps & {
    beforeUpload?: NonNullable<ProFormUploadButtonProps['fieldProps']>['beforeUpload']
  }
>(({ fieldProps, beforeUpload, ...props }) => {
  return <ProFormUploadButton {...props} fieldProps={{ beforeUpload, ...fieldProps }} />
})

export function S3Upload({ value = EMPTY_ARRAY, onChange, bucket, crop = false, ...props }: S3UploadProps) {
  const [fileList, setFileList] = useState<UploadFile<string>[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    Promise.all(
      value.map(objectName => api.s3service.preSignedUrl({
        bucket,
        method: 'GET',
        objectName,
      })),
    ).then((urls) => {
      setFileList(
        value.map((objectName, index) => ({
          uid: objectName,
          name: objectName,
          status: 'done',
          response: objectName,
          url: urls[index],
        })),
      )
    })
  }, [bucket, value])

  return (
    <>
      <ConditionalWrapper condition={crop} wrapper={children => <ImgCrop>{children}</ImgCrop>}>
        <ProFormUploadButtonWrapper
          value={fileList}
          onChange={({ fileList }) => {
            const allDone = fileList.every(file => file.status === 'done')
            if (allDone) {
              onChange?.(fileList.map(file => file.response as string))
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
            onPreview(file) {
              setPreviewImage(file.url!)
              setPreviewOpen(true)
            },
          }}
          {...props}
        />
      </ConditionalWrapper>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  )
}
