import type { PropsWithChildren } from 'react'

interface ContentProps {
  className: string
}

export default function Content({ className, children }: PropsWithChildren<ContentProps>) {
  return <main className={className}>{children}</main>
}
