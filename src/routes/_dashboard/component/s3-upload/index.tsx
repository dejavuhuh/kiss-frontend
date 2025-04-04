import { S3Upload } from '@/components/form'
import { PlusOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/_dashboard/component/s3-upload/')({
  component: S3UploadComponent,
})

function S3UploadComponent() {
  const [value, setValue] = useState<string[]>([])

  return (
    <div className="card">
      <S3Upload value={value} onChange={setValue} bucket="system-error-screenshot" listType="picture-card">
        <button type="button" className="cursor-pointer">
          <PlusOutlined />
          <div>点击上传</div>
        </button>
      </S3Upload>
    </div>
  )
}
