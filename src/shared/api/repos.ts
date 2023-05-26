import { improvedFetchQuery } from '@/shared/lib/api'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import {
  SearchReposParams,
  SearchReposType,
} from '@/shared/model/types/search-repos'
import { ViewerParams, ViewerReposType } from '@/shared/model/types/viewer'
import { ListResponse } from '@/shared/model/types/common'
import {
  GetRepositoryParams,
  GetRepositoryResponse,
} from '@/shared/model/types/repos'

const RepositoryItem = `
  owner {
    login
    avatarUrl
    url
  }
  name
  url
  stargazerCount
  pushedAt
  languages(first: 20) {
    nodes {
      name
      color
    }
  }
  shortDescriptionHTML
`

export const reposApi = createApi({
  reducerPath: 'reposApi',
  baseQuery: improvedFetchQuery,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchRepos: build.query<ListResponse<SearchReposType>, SearchReposParams>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query($query: String!, $after: String, $before: String, $first: Int, $last: Int) {
              search(query: $query, type:REPOSITORY, first: $first, last: $last, after: $after, before: $before) {
                nodes {
                  ...on Repository {
                    ${RepositoryItem}
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                  hasPreviousPage
                  startCursor
                }
                repositoryCount
              }
            }
          `,
          variables: { ...params },
        }),
      }),
    }),
    getViewerRepos: build.query<ListResponse<ViewerReposType>, ViewerParams>({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query($after: String, $before: String, $first: Int, $last: Int) {
              viewer {
                repositories(first: $first, last: $last, after: $after, before: $before) {
                  nodes {
                    ${RepositoryItem}
                  }
                  pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                  }
                  totalCount
                }
              }
            }
          `,
          variables: { ...params },
        }),
      }),
    }),
    getRepository: build.query<
      ListResponse<GetRepositoryResponse>,
      GetRepositoryParams
    >({
      query: (params) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query($name: String!, $owner: String!) {
              repository(name: $name, owner: $owner) {
                ${RepositoryItem}
              }
            }
          `,
          variables: { ...params },
        }),
      }),
    }),
  }),
})

export const {
  useLazySearchReposQuery,
  useLazyGetViewerReposQuery,
  useGetRepositoryQuery,
} = reposApi
