import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from './route-names'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: routeNames.home,
    component: () => import('@/views/home-page/Home.vue')
  },
  {
    path: '/car',
    name: routeNames.car,
    component: () => import('@/views/car-page/Car.vue'),
    props: (route) => ({ query: route.query })
  },
  {
    path: '/create',
    name: routeNames.create,
    component: () => import('@/views/create-page/Create.vue')
  },
  {
    path: '/search',
    name: routeNames.search,
    component: () => import('@/views/search-page/Search.vue'),
    props: (route) => ({ query: route.query })
  },
  {
    path: '/finances',
    name: routeNames.finances,
    component: () => import('@/views/Finances.vue')
  },
  {
    path: '/top-rated',
    name: routeNames.top,
    component: () => import('@/views/TopRated.vue')
  },
  {
    path: '/auction',
    name: routeNames.auction,
    component: () => import('@/views/Auction.vue')
  },
  {
    path: '/favorites',
    name: routeNames.favorites,
    component: () => import('@/views/Favorites.vue')
  },
  {
    path: '/profile',
    name: routeNames.profile,
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/chats',
    name: routeNames.chats,
    component: () => import('@/views/Chats.vue')
  },
  {
    path: '/uikit',
    name: routeNames.uikit,
    component: () => import('@/views/UiKit.vue')
  }
]

export {
  routes
}
