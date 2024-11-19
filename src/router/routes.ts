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
    path: '/cars/:id',
    name: routeNames.cars,
    component: () => import('@/views/car-page/CarPage.vue')
  },
  {
    path: '/create-car',
    name: routeNames.createCar,
    component: () => import('@/views/create-car-page/CreateCar.vue'),
    meta: { isAuthProtected: true }
  },
  {
    path: '/search',
    name: routeNames.search,
    component: () => import('@/views/search-page/SearchPage.vue'),
    props: (route) => ({ query: route.query })
  },
  {
    path: '/top-rated',
    name: routeNames.top,
    component: () => import('@/views/top-rated/TopRated.vue')
  },
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
  },
  {
    path: '/profile',
    name: routeNames.profile,
    component: () => import('@/views/profile-page/ProfilePage.vue'),
    meta: { isAuthProtected: true },
    children: [
      {
        path: 'my-cars',
        children: [
          {
            path: '',
            name: routeNames.myCars,
            component: () => import('@/views/profile-page/ProfileMyCars.vue')
          },
          {
            path: 'statistic/:id',
            name: routeNames.carStatistic,
            component: () => import('@/views/profile-page/ProfileCarStatistic.vue')
          }
        ]
      },
      {
        path: 'profile-info',
        name: routeNames.profileInfo,
        component: () => import('@/views/profile-page/ProfileUserInfo.vue'),
        props: (route) => ({ token: route.query.token, email: route.query.email })
      },
      {
        path: 'views-history',
        name: routeNames.viewsHistory,
        component: () => import('@/views/profile-page/ProfileViewsHistory.vue')
      },
      {
        path: 'chats',
        name: routeNames.chats,
        component: () => import('@/views/profile-page/Chats.vue')
      }
    ]
  },
  {
    path: '/edit-car/:id',
    name: routeNames.carEdit,
    component: () => import('@/views/profile-page/ProfileEditCar.vue'),
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
