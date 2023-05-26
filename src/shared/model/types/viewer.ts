import { ReposItem } from '@/shared/model/types/repos'
import { PageInfo } from '@/shared/model/types/common'

export type ViewerResponse<T> = {
  viewer: T
}

export type ViewerReposType = ViewerResponse<{
  repositories: {
    nodes: ReposItem[]
    pageInfo: PageInfo
    totalCount: number
  }
}>

export type ViewerParams = {
  after?: string | null
  first?: number
  last?: number
}
