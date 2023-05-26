import React from 'react'
import { useLazyGetViewerReposQuery } from '@/shared/api/repos'

const GetLazyViewerReposQuery = () => {
  const [getViewerRepos, data] = useLazyGetViewerReposQuery()

  return {
    getViewerRepos,
    ...data,
  }
}

export default GetLazyViewerReposQuery
