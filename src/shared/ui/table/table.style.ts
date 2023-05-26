import { TableProps } from '@/shared/ui/table/table.type'
import clsx from 'clsx'

export function getTableClassName() {
  return clsx('relative', 'flex', 'flex-col', 'h-full')
}

export function getTableHeaderWrapperClassName() {
  return clsx('w-full', 'overflow-hidden', 'shrink-0')
}

export function getTableHeaderClassName() {
  return clsx(
    'w-full',
    'table-fixed',
    'border-separate',
    'border-b',
    'border-b-gray_200',
    'text-gray_600',
  )
}

export function getTableCellClassName() {
  return clsx(
    'relative',
    'z-1',
    'text-ellipsis',
    'align-middle',
    'text-left',
    'p-[8px]',
    'first:rounded-l-[4px]',
    'last:rounded-r-[4px]',
  )
}

export function getCellClassName() {
  return clsx('box-border', 'text-ellipsis', 'break-words')
}

export function getTableBodyWrapperClassName() {
  return clsx('relative', 'overflow-hidden', 'flex-1')
}

export function getTableBodyScrollbarWrapClassName() {
  return clsx('h-full', 'overflow-auto')
}

export function getTableBodyClassName() {
  return clsx(
    'w-full',
    'table-fixed',
    'border-separate',
    'pt-[8px]',
    'text-gray_900',
  )
}

export function getTableRowClassName(isCursorPointer: boolean) {
  return clsx(
    'hover:bg-gray_100',
    'transition-colors',
    isCursorPointer && 'cursor-pointer',
  )
}
