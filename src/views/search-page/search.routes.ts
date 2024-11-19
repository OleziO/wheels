import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const searchRoutes: RouteRecordRaw[] = [
  {
    path: '/search',
    name: routeNames.search,
    component: () => import('@/views/search-page/SearchPage.vue'),
    props: (route) => ({ query: route.query })
  }
]
