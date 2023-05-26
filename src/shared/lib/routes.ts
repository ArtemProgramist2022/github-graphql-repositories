import { RoutesType } from '@/shared/model/types/routes'

export const routes: Record<RoutesType, string> = {
  get main() {
    return '/'
  },
  get detailRepo() {
    return this.main + ':owner' + '/:name'
  },
}
