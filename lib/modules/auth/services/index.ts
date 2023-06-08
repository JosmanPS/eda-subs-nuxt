import { IAuthStorage } from "./auth-storage.service";
import { AuthService } from "./auth.service";

let authService: AuthService;

export function initAuthServices(authStorage: IAuthStorage) {
  authService = new AuthService(authStorage);
}

export { authService };
