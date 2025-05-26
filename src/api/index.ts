/// <reference types="user-agent-data-types" />
/* eslint-disable no-throw-literal */
import { Api } from './__generated'

function getAcceptLanguage() {
  const languages = navigator.languages
  return languages
    .slice(0, 3)
    .map((lang, index) => `${lang}${index === 0 ? '' : `;q=${1 - 0.1 * index}`}`)
    .join(',')
}

function getSecChUa() {
  return navigator.userAgentData!.brands.map(({ brand, version }) => `"${brand}";v="${version}"`).join(', ')
}

// 导出全局变量`api`
export const api = new Api(async ({ uri, method, body }) => {
  const requestUrl = `/api${uri}`
  const bodyString = body !== undefined ? JSON.stringify(body) : undefined
  const contentType = 'application/json'
  const authorization = `Bearer ${localStorage.getItem('token')}`
  const traceId = crypto.randomUUID().replace(/-/g, '')

  // 适当停顿以提升用户确认感
  await new Promise(resolve => setTimeout(resolve, 150))

  const response = await fetch(requestUrl, {
    method,
    body: bodyString,
    headers: {
      'Content-Type': contentType,
      'Authorization': authorization,
      'X-TraceId': traceId,
    },
  })

  if (response.status === 401) {
    throw { status: response.status }
  }

  if (response.status === 500) {
    const url = `${location.origin}${requestUrl}`
    const searchParams = new URL(url).searchParams
    const query = Object.fromEntries(searchParams.entries())
    const request: HttpRequest = {
      url,
      method,
      headers: {
        'Accept': '*/*',
        'Accept-Language': getAcceptLanguage(),
        'Authorization': authorization,
        'Connection': 'keep-alive',
        'Content-Type': contentType,
        'Origin': location.origin,
        'Referer': location.href,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': navigator.userAgent,
        'X-TraceId': traceId,
        'sec-ch-ua': getSecChUa(),
        'sec-ch-ua-mobile': `?${navigator.userAgentData?.mobile ? 1 : 0}`,
        'sec-ch-ua-platform': `"${navigator.userAgentData?.platform}"`,
      },
      query,
      body: bodyString,
    }

    throw {
      ...await response.json(),
      traceId,
      request,
    } as ApiError
  }

  if (response.status !== 200) {
    throw {
      ...await response.json(),
      traceId,
    } as ApiError
  }
  const text = await response.text()
  if (text.length === 0) {
    return null
  }
  return JSON.parse(text)
})

interface HttpRequest {
  url: string
  method: string
  headers: Record<string, string>
  query: Record<string, string>
  body?: string
}

export interface ApiError {
  detail: string
  status: 400 | 401 | 403 | 500
  traceId: string
  request: HttpRequest
}

export * from './__generated'
