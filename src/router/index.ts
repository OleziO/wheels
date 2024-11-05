import { createRouter, createWebHistory } from 'vue-router'

import { routeGuard } from './route-guard'
import { routeNames } from '@/router/route-names'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior () {
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach(routeGuard)

export const validateData = function (searchData: ICarsSearchData) {
  const data = {
    ...searchData,
    involvedAccident: searchData.involvedAccident && searchData.involvedAccident.length < 2
      ? searchData.involvedAccident[0]
      : null

  } as ICarsSearchData

  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(data).filter(([_, value]) =>
      value != null &&
      value !== 0 &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0) &&
      !(typeof value === 'object' && value !== null && Object.keys(value).length === 0)
    )
  )
}

export const replaceRouterQuery = function (routeName: string, obj: any) {
  const currentRouteName = router.currentRoute.value.name
  const routerQuery = router.currentRoute.value.query
  const query = validateData({ ...routerQuery, ...obj })

  if (JSON.stringify(routerQuery) !== JSON.stringify(query)) {
    router.replace({ name: routeName || currentRouteName, query })
  }
}

export { routeNames }
export default router
