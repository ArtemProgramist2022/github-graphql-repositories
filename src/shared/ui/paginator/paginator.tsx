import React, { FC, useCallback, useEffect, useState } from 'react'
import { getPageClassName } from '@/shared/ui/paginator/paginator.style'
import { PaginatorProps } from '@/shared/ui/paginator/paginator.type'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const Paginator: FC<PaginatorProps> = (props) => {
  const {
    page,
    count,
    limit = 10,
    visiblePages = 2,
    disabled,
    onChange,
  } = props
  const [currentPage, setCurrentPage] = useState<number>(page)
  const [totalPages, setTotalPages] = useState(Math.ceil(count / limit))

  const buildPaginationArray = useCallback(() => {
    const totalNumbers = visiblePages * 2 + 2
    const totalBlocs = totalNumbers + 2
    if (totalPages > totalBlocs) {
      const startPage = Math.max(2, currentPage - visiblePages)
      const endPage = Math.min(totalPages - 1, currentPage + visiblePages)
      let pages: Array<string | number> = range(startPage, endPage)
      const hasLeftSplit = startPage > 2
      const hasRightSplit = totalPages - endPage > 1
      const splitOffset = totalNumbers - (pages.length + 1)
      switch (true) {
        case hasLeftSplit && !hasRightSplit: {
          pages = [
            LEFT_PAGE,
            ...range(startPage - splitOffset, startPage - 1),
            ...pages,
          ]
          break
        }
        case !hasLeftSplit && hasRightSplit: {
          pages = [
            ...pages,
            ...range(endPage + 1, endPage + splitOffset),
            RIGHT_PAGE,
          ]
          break
        }
        case hasLeftSplit && hasRightSplit:
        default:
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
      }
      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }, [currentPage, totalPages, visiblePages])

  useEffect(() => {
    setTotalPages(Math.ceil(count / limit))
    buildPaginationArray()
    setCurrentPage(page)
  }, [buildPaginationArray, count, limit, page])

  function range(from: number, to: number, step = 1) {
    let i = from
    const range: Array<number> = []
    while (i <= to) {
      range.push(i)
      i += step
    }
    return range
  }

  function handleChangePage(pageClicked: string | number) {
    if (pageClicked === '...' || disabled) return
    const currentPageAction =
      pageClicked === LEFT_PAGE
        ? currentPage - 1
        : pageClicked === RIGHT_PAGE
        ? currentPage + 1
        : pageClicked
    if (+currentPageAction < 1 || +currentPageAction > totalPages) return
    setCurrentPage(Number(currentPageAction))
    onChange?.(Number(pageClicked))
  }

  const renderPages = buildPaginationArray().map((pageItem) => {
    return (
      <div key={pageItem} className="">
        <div
          className={getPageClassName(String(pageItem) === String(currentPage))}
        >
          <div className="py-[8px]">
            {pageItem === 'LEFT' || pageItem === 'RIGHT' ? '...' : pageItem}
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className="mt-[40px] relative">
      <div className="w-full max-w-[100%] h-[49px] bg-white justify-center flex">
        {totalPages > 1 ? (
          <div className="flex items-center">
            <div
              onClick={handleChangePage.bind(null, currentPage - 1)}
              className="w-[10px] h-[10px] border-l-black border-b-black border-l-[2px] border-b-[2px] leading-[0] text-[0] rotate-[45deg] hover:border-l-primary_50 hover:border-b-primary_50 transition-colors cursor-pointer"
            />
            <div className="bg-white inline-flex h-[40px] overflow-hidden font-[700] text-[14px] rounded-[10px] px-[10px]">
              <div className="inline-flex items-center">{renderPages}</div>
            </div>
            <div
              onClick={handleChangePage.bind(null, currentPage + 1)}
              className="w-[10px] h-[10px] border-l-black border-b-black border-l-[2px] border-b-[2px] leading-[0] text-[0] rotate-[-135deg] hover:border-l-primary_50 hover:border-b-primary_50 transition-colors cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex-1 h-[40px]" />
        )}
        <div />
      </div>
    </div>
  )
}

export default Paginator
