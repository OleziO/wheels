import { routeNames } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const profileRoutes: RouteRecordRaw[] = [
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
        children: [
          {
            path: '',
            name: routeNames.chats,
            component: () => import('@/views/chat-page/Chats.vue')
          },
          {
            path: ':id',
            name: routeNames.chatPage,
            component: () => import('@/views/chat-page/ChatPage.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/edit-car/:id',
    name: routeNames.carEdit,
    component: () => import('@/views/profile-page/ProfileEditCar.vue'),
    meta: { isAuthProtected: true }
  }
]
