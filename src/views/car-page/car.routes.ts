import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const carRoutes: RouteRecordRaw[] = [
  {
    path: '/cars/:id',
    name: routeNames.cars,
    component: () => import('@/views/car-page/CarPage.vue')
  }
]
