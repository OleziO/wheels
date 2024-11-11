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
    component: () => import('@/views/create-page/Create.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/search',
    name: routeNames.search,
    component: () => import('@/views/search-page/Search.vue'),
    props: (route) => ({ query: route.query })
  },
  {
    path: '/top-rated',
    name: routeNames.top,
    component: () => import('@/views/TopRated.vue')
  },
  {
    path: '/auction',
    name: routeNames.auction,
    component: () => import('@/views/Auction.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/favorites',
    name: routeNames.favorites,
    component: () => import('@/views/Favorites.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/profile',
    name: routeNames.profile,
    component: () => import('@/views/Profile.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/chats',
    name: routeNames.chats,
    component: () => import('@/views/Chats.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/uikit',
    name: routeNames.uikit,
    component: () => import('@/views/UiKit.vue'),
    meta: { isAuthProtected: true }
  }
]

export {
  routes
}
