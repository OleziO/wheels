import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const auctionRoutes: RouteRecordRaw[] = [
  {
    path: '/auctions',
    meta: { isAuthProtected: true },
    children: [
      {
        path: '',
        name: routeNames.auctionsList,
        component: () => import('@/views/auctions-page/AuctionsPage.vue')
      },
      {
        path: 'auction-details/:id',
        name: routeNames.auction,
        component: () => import('@/views/auctions-page/AuctionDetailsPage.vue')
      }
    ]
  }
]
