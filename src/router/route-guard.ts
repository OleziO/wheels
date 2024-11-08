import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { privateRouteNames } from './route-names'
import authService from '@/components/shared/app-auth-modal/app-auth.service.service'
import { useAuthStore } from '@/components/shared/app-auth-modal/app-auth.store'

export const routeGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const session = await authService.getSession()
  const authStore = useAuthStore()

  if (
    !session.session &&
    privateRouteNames.includes(to.name as string)
  ) {
    localStorage.setItem('redirectAfterLogin', to.name as string)
    authStore.showAuthModal = true
    return next('/')
  }

  if (!session.session) authService.logout()

  next()
}
