import { Api } from './__generated'

// 导出全局变量`api`
export const api = new Api(async ({ uri, method, headers, body }) => {
  const response = await fetch(`/api${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      ...headers,
    },
  })
  if (response.status !== 200) {
    throw await response.json()
  }
  const text = await response.text()
  if (text.length === 0) {
    return null
  }
  return JSON.parse(text)
})

export interface ApiError {
  detail: string
  title: 'Unauthorized'
}

export * from './__generated'
