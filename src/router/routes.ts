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
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/create',
    name: routeNames.create,
    component: () => import('@/views/Create.vue')
  },
  {
    path: '/search',
    name: routeNames.search,
    component: () => import('@/views/Search.vue')
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
  }
]

export {
  routes
}
