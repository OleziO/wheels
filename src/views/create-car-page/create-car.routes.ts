import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const createCarRoutes: RouteRecordRaw[] = [
  {
    path: '/create-car',
    name: routeNames.createCar,
    component: () => import('@/views/create-car-page/CreateCar.vue'),
    meta: { isAuthProtected: true }
  }
]
