import { ReposItem } from '@/shared/model/types/repos'
import { PageInfo } from '@/shared/model/types/common'

export type SearchReposResponse<T> = {
  search: T
}

export type SearchReposType = SearchReposResponse<{
  nodes: ReposItem[]
  pageInfo: PageInfo
  repositoryCount: number
}>

export type SearchReposParams = {
  query: string
  after?: string | null
  first?: number
  last?: number
}
