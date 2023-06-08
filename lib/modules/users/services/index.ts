import { IAuthService } from "../../auth/services/auth.service";
import { UsersService } from "./users.service";

let authService: IAuthService;
let usersService: UsersService;

export function initUserServices(auth: IAuthService) {
  authService = auth;
  usersService = new UsersService(authService);
}

export { usersService, authService };
