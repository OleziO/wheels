import type { RouteRecordRaw } from 'vue-router'
import { auctionRoutes } from '@/views/auctions-page/auction.routes'
import { profileRoutes } from '@/views/profile-page/profile.routes'
import { topRatedRoutes } from '@/views/top-rated/top-rated.routes'
import { searchRoutes } from '@/views/search-page/search.routes'
import { uiKitRoutes } from '@/views/ui-kit-page/ui-kit.routes'
import { createCarRoutes } from '@/views/create-car-page/create-car.routes'
import { carRoutes } from '@/views/car-page/car.routes'
import { homeRoutes } from '@/views/home-page/home.routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  ...homeRoutes,
  ...carRoutes,
  ...createCarRoutes,
  ...searchRoutes,
  ...topRatedRoutes,
  ...auctionRoutes,
  ...profileRoutes,
  ...uiKitRoutes
]

export {
  routes
}
