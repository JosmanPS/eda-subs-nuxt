import { useAuthStore } from "~~/store/auth.store"

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if ((!!authStore.user === true)) {
    return navigateTo('/dashboard')
  }
})
