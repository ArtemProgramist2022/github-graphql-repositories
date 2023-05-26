export type ListResponse<T> = {
  data: T
}

export type PageInfo = {
  endCursor?: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string | null
}
