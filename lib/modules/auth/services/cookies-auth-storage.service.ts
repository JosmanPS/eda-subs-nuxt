import { IAuthStorage } from "./auth-storage.service";

export class CookiesAuthStorage implements IAuthStorage {
  private cookies: any

  constructor(cookies: any) {
    this.cookies = cookies
  }

  public getItem(key: string): string {
    return this.cookies.get(key) as string
  }

  public setItem(key: string, value: string): void {
    this.cookies.set(key, value)
  }

  public removeItem(key: string): void {
    this.cookies.remove(key)
  }
}
