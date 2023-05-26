import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query'
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
export const apiPrefix = 'https://api.github.com/graphql'
const baseQuery = fetchBaseQuery({
  baseUrl: apiPrefix,
  headers: {
    Authorization: 'bearer ' + import.meta.env.VITE_GITHUB_TOKEN,
  },
})

/**
 * Fetch query to show error notifications and remove null values
 * @async
 * @param args
 * @param api
 * @param extraOptions
 * @returns {Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>}
 */
export const improvedFetchQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (
  args,
  api,
  extraOptions,
): Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  const result = await baseQuery(args, api, extraOptions)

  return result
}
