import type { Data } from '@/types'
import type { ModalFormProps as ProModalFormProps } from '@ant-design/pro-components'
import { ModalForm as ProModalForm } from '@ant-design/pro-components'

interface ModalFormProps<T extends Data> {
  onSubmit?: (formData: T) => Promise<void>
}

export function ModalForm<T extends Data>({ onSubmit, ...props }: ProModalFormProps<T> & ModalFormProps<T>) {
  return (
    <ProModalForm<T>
      {...props}
      isKeyPressSubmit
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (formData) => {
        await onSubmit?.(formData)
        return true
      }}
    />
  )
}
