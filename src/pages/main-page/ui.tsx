import React, { useEffect, useMemo, useState } from 'react'
import { Input, Paginator, Table } from '@/shared/ui'
import { useDebounce, usePrevious } from '@/shared/hooks'
import { getDateFormat } from '@/shared/lib/date'
import { GetLazyViewerReposQuery, SearchLazyReposQuery } from '@/entities/repos'
import { PageInfo } from '@/shared/model/types/common'
import { LIMIT_ELEMENTS } from '@/shared/lib/const'
import {
  FILTER_PAGE,
  FILTER_QUERY,
  getFiltersLocalStorage,
  setFiltersLocalStorage,
} from '@/pages/main-page/lib'
import { ReposItem } from '@/shared/model/types/repos'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/lib/routes'

const MainPage = () => {
  const navigate = useNavigate()
  const [{ query, page }, setFilters] = useState({
    query: getFiltersLocalStorage().query || '',
    page: 1,
  })
  const debouncedQuery = useDebounce(query)
  const prevPage = usePrevious(page)
  const {
    searchRepos,
    data: searchReposData,
    isLoading: isSearchReposLoading,
    isFetching: isSearchReposFetching,
  } = SearchLazyReposQuery()
  const {
    getViewerRepos,
    data: viewerReposData,
    isLoading: isViewerReposLoading,
    isFetching: isViewerReposFetching,
  } = GetLazyViewerReposQuery()

  useEffect(() => {
    function getPageInfo(pageInfo?: PageInfo) {
      return {
        isNext: prevPage && prevPage < page && pageInfo?.hasNextPage,
        isPrev: prevPage && prevPage > page && pageInfo?.hasPreviousPage,
      }
    }

    if (isDebouncedQueryExist(debouncedQuery)) {
      const pageInfo = searchReposData?.data.search.pageInfo
      const { isNext, isPrev } = getPageInfo(pageInfo)
      const params = {
        query: debouncedQuery,
        after: isNext ? pageInfo?.endCursor : undefined,
        first: isNext ? LIMIT_ELEMENTS : undefined,
        before: isPrev ? pageInfo?.startCursor : undefined,
        last: isPrev ? LIMIT_ELEMENTS : undefined,
      }
      if (!isNext && !isPrev) params.first = 10
      searchRepos(params)
    } else {
      const pageInfo = viewerReposData?.data.viewer.repositories.pageInfo
      const { isNext, isPrev } = getPageInfo(pageInfo)
      const params = {
        after: isNext ? pageInfo?.endCursor : undefined,
        first: isNext ? LIMIT_ELEMENTS : undefined,
        before: isPrev ? pageInfo?.startCursor : undefined,
        last: isPrev ? LIMIT_ELEMENTS : undefined,
      }
      if (!isNext && !isPrev) params.first = 10
      getViewerRepos(params)
    }
  }, [debouncedQuery, page])

  const loadingPage =
    isViewerReposLoading ||
    isViewerReposFetching ||
    isSearchReposLoading ||
    isSearchReposFetching

  const tableData = useMemo(() => {
    return (
      (isDebouncedQueryExist(debouncedQuery)
        ? searchReposData?.data.search.nodes
        : viewerReposData?.data.viewer.repositories.nodes) || []
    )
  }, [debouncedQuery, searchReposData, viewerReposData])

  const columns = useMemo(() => {
    return [
      {
        label: 'Название',
        prop: 'name',
        replacer(name: string) {
          return name
        },
      },
      {
        label: 'Кол-во звёзд',
        prop: 'stargazerCount',
      },
      {
        label: 'Дата последнего коммита',
        prop: 'pushedAt',
        replacer(pushedAt: string) {
          return getDateFormat(pushedAt, 'DD.MM.YYYY')
        },
      },
      {
        label: 'Ссылка на Github',
        prop: 'url',
        replacer(url: string) {
          return (
            <a
              onClick={(e) => e.stopPropagation()}
              className="underline"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Перейти
            </a>
          )
        },
      },
    ]
  }, [])

  const countPaginator = useMemo(() => {
    const searchTotalCount = searchReposData?.data.search.repositoryCount || 0
    const viewerTotalCount =
      viewerReposData?.data.viewer.repositories.totalCount || 0

    return isDebouncedQueryExist(debouncedQuery)
      ? searchTotalCount > 100
        ? 100
        : searchTotalCount
      : viewerTotalCount > 100
      ? 100
      : viewerTotalCount
  }, [debouncedQuery, searchReposData, viewerReposData])

  function isDebouncedQueryExist(debouncedQuery: string) {
    return !!debouncedQuery || debouncedQuery === '0'
  }

  function handleChangeInput(value: string) {
    setFiltersLocalStorage(FILTER_QUERY, JSON.stringify(value))
    setFilters((filters) => ({
      ...filters,
      query: value,
      page: 1,
    }))
  }

  function handleChangePage(page: number) {
    setFiltersLocalStorage(FILTER_PAGE, JSON.stringify(page))
    setFilters((filters) => ({
      ...filters,
      page,
    }))
  }

  function handleRowClickTable(row: ReposItem) {
    navigate(routes.main + row.owner.login + `/${row.name}`)
  }

  return (
    <div>
      <Input
        value={query}
        onChange={(event) => handleChangeInput(event.target.value)}
        placeholder="Поиск"
      />
      <div className="pt-[20px]">
        <Table
          data={tableData}
          columns={columns}
          loading={loadingPage}
          rowClick={(row) => handleRowClickTable(row)}
        />
      </div>
      <div className="pt-[10px]">
        <Paginator
          page={page}
          count={countPaginator}
          disabled={loadingPage}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  )
}

export default MainPage
