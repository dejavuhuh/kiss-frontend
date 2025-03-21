import { Api } from './__generated'

// 导出全局变量`api`
export const api = new Api(async ({ uri, method, headers, body }) => {
  const tenant = (window as any).__tenant as string | undefined
  const response = await fetch(`/api${uri}`, {
    method,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      ...headers,
      ...(tenant !== undefined && tenant !== '' ? { tenant } : {}),
    },
  })
  if (response.status === 400) {
    throw await response.json()
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
}

export * from './__generated'
