import { ReactNode } from 'react'

export type TableProps = {
  columns?: TableColumns[]
  data?: TableData[]
  maxHeight?: number | string
  rowClick?: (data: any) => void
  loading?: boolean
  backgroundStriping?: boolean
}

export type TableColumns = {
  width?: number
  label: string
  prop: 'defaultProp' | string
  replacer?: (data: any) => ReactNode
}

export type TableData = {
  [prop: string]: any
}
