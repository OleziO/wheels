import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/views/auth/auth.store'
import { routeNames } from './route-names'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  const generalStore = useGeneralStore()

  const session = await authService.getSession()

  if (to.meta.isAuthProtected && !session.session) {
    authStore.redirectLink = to.name as string
    authStore.showAuthModal = true
    return next(routeNames.home)
  }

  if (!session.session) authStore.logout()
  else if (!authStore.user) authStore.user = { ...session.session.user.user_metadata, avatar: session.avatar }

  generalStore.unreadMessagesCount = await chatService.getAllUreadMessages(authStore.user?.sub)

  next()
}
