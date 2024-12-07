import { useLoading } from '@/components/Loading'
import PubSub from 'pubsub-js'
import { onError } from '../constants/event.ts'
import { Api } from './__generated'

const BASE_URL = 'http://localhost:8080'

// 导出全局变量`api`
const api = new Api(async ({ uri, method, headers, body }) => {
  try {
    useLoading.getState().start()
    const response = await fetch(`${BASE_URL}${uri}`, {
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        ...headers,
      },
      credentials: 'include',
    })
    if (response.status !== 200) {
      const error = await response.json()
      PubSub.publish(onError, error)
      throw error
    }
    const contentType = response.headers.get('Content-Type')
    const isJson = contentType?.includes('application/json')
    return isJson ? response.json() : response.text()
  }
  finally {
    useLoading.getState().end()
  }
})

export default api
export * from './__generated'
export * from './utils'
