import type { RequestOf, ResponseOf } from '@/api/__generated'

type ExtractSpecification<T> = T extends { specification: infer S } ? S : never
export type SpecificationOf<T> = ExtractSpecification<RequestOf<T>>

type ExtractView<T> = T extends { rows: Array<infer V> } ? V : never
export type ViewOf<T> = ExtractView<ResponseOf<T>>

type ExtractBody<T> = T extends { body: infer B } ? B : never
export type InputOf<T> = ExtractBody<RequestOf<T>>
