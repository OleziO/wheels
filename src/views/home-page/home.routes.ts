import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.home,
    component: () => import('@/views/home-page/Home.vue')
  }
]
