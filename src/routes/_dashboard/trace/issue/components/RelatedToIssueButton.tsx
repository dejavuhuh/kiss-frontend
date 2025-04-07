import { api } from '@/api'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProFormSelect } from '@ant-design/pro-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App, Button } from 'antd'

export function RelatedToIssueButton({ id }: { id: number }) {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['issues', id, 'relatable'],
    queryFn: () => api.issueService.relatable({ id }),
  })

  const { message } = App.useApp()

  const relateTo = useMutation({
    mutationFn: api.issueService.relateTo,
    onSuccess() {
      message.success('关联成功')
      queryClient.invalidateQueries({
        queryKey: ['issues', id],
      })
    },
  })

  return (
    <ModalForm
      title="关联问题"
      width={500}
      trigger={<Button type="dashed" size="small" icon={<PlusOutlined className="size-3" />} />}
      onFinish={async ({ relatedToId }) => {
        await relateTo.mutateAsync({ id, relatedToId })
        return true
      }}
      submitter={{
        searchConfig: {
          submitText: '关联',
        },
      }}
    >
      <ProFormSelect
        showSearch
        placeholder="请输入问题ID或标题"
        name="relatedToId"
        rules={[{ required: true, message: '请选择关联问题' }]}
        options={data?.map(issue => ({ value: issue.id, label: issue.title }))}
        fieldProps={{
          filterOption: (input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            || `${option?.value ?? ''}` === input,
        }}
      />
    </ModalForm>
  )
}
