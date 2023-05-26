import React from 'react'
import { useGetRepositoryQuery } from '@/shared/api/repos'
import { GetRepositoryParams } from '@/shared/model/types/repos'

const GetRepositoryQuery = (params: GetRepositoryParams) => {
  return useGetRepositoryQuery(params)
}

export default GetRepositoryQuery
