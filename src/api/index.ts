import { Api } from './__generated'

// 导出全局变量`api`
export const api = new Api(async ({ uri, method, headers, body }) => {
  const traceId = crypto.randomUUID().replace(/-/g, '')
  const response = await fetch(`/api${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'X-TraceId': traceId,
      ...headers,
    },
  })

  if (response.status === 401) {
    // eslint-disable-next-line no-throw-literal
    throw {
      type: 'Unauthorized',
      detail: await response.text(),
    } as ApiError
  }

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
  type: 'Unauthorized'
}

export * from './__generated'
