import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const topRatedRoutes: RouteRecordRaw[] = [
  {
    path: '/top-rated',
    name: routeNames.top,
    component: () => import('@/views/top-rated/TopRated.vue')
  }
]
