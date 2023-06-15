import { IAuthService } from "../../auth/services/auth.service";
import { TeachersService } from "./teachers.service";

let teachersService: TeachersService;

export function initCoursesServices(authService: IAuthService) {
  teachersService = new TeachersService(authService);
}

export { teachersService };
