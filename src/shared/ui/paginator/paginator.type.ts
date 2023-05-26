export type PaginatorProps = {
  page: number
  count: number
  limit?: number
  visiblePages?: number
  disabled?: boolean
  onChange: (pageClicked: number) => void
}
