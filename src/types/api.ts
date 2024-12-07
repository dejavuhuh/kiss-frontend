import type { HttpStatus } from 'http-status-ts'

export interface ProblemDetail {
  title: string
  status: HttpStatus
  detail?: string
}
