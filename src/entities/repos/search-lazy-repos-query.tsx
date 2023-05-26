import React from 'react'
import { useLazySearchReposQuery } from '@/shared/api/repos'

const SearchLazyReposQuery = () => {
  const [searchRepos, data] = useLazySearchReposQuery()

  return {
    searchRepos,
    ...data,
  }
}

export default SearchLazyReposQuery
