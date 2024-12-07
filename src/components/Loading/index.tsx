import { Spin } from 'antd'
import { useLoading } from './useLoading'

export function Loading() {
  const counter = useLoading(state => state.counter)
  return <Spin spinning={counter > 0} rootClassName="z-[9999]" fullscreen tip="Loading..." />
}

export * from './useLoading'
