import { initAuthServices } from "~/lib/modules/auth/services"
import { IAuthStorage } from "~~/lib/modules/auth/services/auth-storage.service"

class CookiesAuthStorage implements IAuthStorage {
  public getItem(key: string): string {
    const item = useCookie(key)
    return item.value as string
  }

  public setItem(key: string, value: string): void {
    const item = useCookie(key)
    item.value = value
  }

  public removeItem(key: string): void {
    const item = useCookie(key)
    item.value = null
  }
}

const cookiesAuthStorage = new CookiesAuthStorage()

export default defineNuxtPlugin((nuxtApp) => {
  initAuthServices(cookiesAuthStorage)
})
