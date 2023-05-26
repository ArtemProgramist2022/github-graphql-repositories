import clsx from 'clsx'
import React, { FC, Fragment, useEffect, useRef, MouseEvent } from 'react'
import Loading from '../loading'
import {
  getTableClassName,
  getTableHeaderWrapperClassName,
  getTableHeaderClassName,
  getTableCellClassName,
  getTableBodyWrapperClassName,
  getTableBodyClassName,
  getTableBodyScrollbarWrapClassName,
  getTableRowClassName,
  getCellClassName,
} from './table.style'
import { TableColumns, TableData, TableProps } from './table.type'

const Table: FC<TableProps> = (props) => {
  const { columns = [], data = [], maxHeight, rowClick, loading } = props
  const headerRef = useRef<HTMLDivElement | null>(null)
  const bodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!bodyRef.current) return
    if (maxHeight) {
      bodyRef.current.style.maxHeight =
        typeof maxHeight === 'string' ? maxHeight : maxHeight + 'px'
    } else {
      bodyRef.current.style.maxHeight = ''
    }
  }, [bodyRef, maxHeight])

  function scrollBodyTable() {
    if (headerRef.current && bodyRef.current) {
      headerRef.current.scrollLeft = bodyRef.current.scrollLeft
    }
  }

  function getTableBody() {
    if (!data.length) {
      return (
        <tr>
          <td className={getTableCellClassName()}>
            <div className={clsx(getCellClassName(), 'text-center')}>
              Нет данных
            </div>
          </td>
        </tr>
      )
    }
    return data.map((item, index) => (
      <tr className={getTableRowClassName(!!rowClick)} key={'body-' + index}>
        {columns.map((column, index) => (
          <td
            style={{ width: column.width }}
            className={getTableCellClassName()}
            colSpan={1}
            rowSpan={1}
            key={'td-body' + index}
            onClick={() => rowClick?.(item)}
          >
            <div className={getCellClassName()}>
              {getItemData(column, item)}
            </div>
          </td>
        ))}
      </tr>
    ))
  }

  function getItemData(column: TableColumns, item: TableData) {
    return column.replacer
      ? column.replacer(
          column.prop === 'defaultProp' ? item : item[column.prop],
        )
      : item[column.prop]
  }

  return (
    <div className={getTableClassName()}>
      {loading && <Loading />}
      <Fragment>
        <div ref={headerRef} className={getTableHeaderWrapperClassName()}>
          <table
            className={getTableHeaderClassName()}
            border={0}
            cellPadding={0}
            cellSpacing={0}
          >
            <colgroup>
              {columns.map((column, index) => (
                <col key={'col-' + index} width={column.width} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    className={getTableCellClassName()}
                    colSpan={1}
                    rowSpan={1}
                    key={'th-' + index}
                  >
                    <div className={getCellClassName()}>{column.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className={getTableBodyWrapperClassName()}>
          <div
            ref={bodyRef}
            className={getTableBodyScrollbarWrapClassName()}
            onScroll={scrollBodyTable.bind(null)}
          >
            <table
              className={getTableBodyClassName()}
              border={0}
              cellPadding={0}
              cellSpacing={0}
            >
              <colgroup>
                {!!data.length &&
                  columns.map((column, index) => (
                    <col key={'col-body' + index} width={column.width} />
                  ))}
                {!data.length && <col />}
              </colgroup>
              <tbody>{getTableBody()}</tbody>
            </table>
          </div>
        </div>
      </Fragment>
    </div>
  )
}

export default Table
