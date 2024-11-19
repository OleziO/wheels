import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const uiKitRoutes: RouteRecordRaw[] = [
  {
    path: '/uikit',
    name: routeNames.uikit,
    component: () => import('@/views/ui-kit-page/UiKit.vue'),
    meta: { isAuthProtected: true }
  }
]
