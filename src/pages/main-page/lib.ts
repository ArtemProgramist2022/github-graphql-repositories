export const FILTER_PAGE = 'page'
export const FILTER_QUERY = 'query'

type Filters = typeof FILTER_PAGE | typeof FILTER_QUERY

export function getFiltersLocalStorage() {
  return {
    query: JSON.parse(localStorage.getItem(FILTER_QUERY) || ''),
    page: Number(localStorage.getItem(FILTER_PAGE)),
  }
}

export function setFiltersLocalStorage(key: Filters, value: string) {
  localStorage.setItem(key, value)
}
