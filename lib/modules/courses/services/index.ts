import { IAuthService } from "../../auth/services/auth.service";
import { MasterclassService } from "./masterclass.service";
import { TeachersService } from "./teachers.service";

let teachersService: TeachersService;
let masterclassService: MasterclassService;

export function initCoursesServices(authService: IAuthService) {
  teachersService = new TeachersService(authService);
  masterclassService = new MasterclassService(authService);
}

export { teachersService, masterclassService };
