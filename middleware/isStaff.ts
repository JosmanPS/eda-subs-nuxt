import { useAuthStore } from "~~/store/auth.store"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!(authStore.user?.isStaff === true)) {
    return navigateTo('/dashboard')
  }
})
