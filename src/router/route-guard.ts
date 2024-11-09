import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import authService from '@/views/auth/auth.service.service'
import { useAuthStore } from '@/views/auth/auth.store'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const session = await authService.getSession()
  const authStore = useAuthStore()

  if (to.meta.isAuthProtected && !session.session) {
    authStore.redirectLink = to.name as string
    authStore.showAuthModal = true
    return next(from.name as string)
  }

  if (!session.session) authStore.logout()

  next()
}
