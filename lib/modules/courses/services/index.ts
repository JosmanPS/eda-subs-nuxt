import { IAuthService } from "../../auth/services/auth.service";
import { CoursesService } from "./courses.service";
import { MasterclassService } from "./masterclass.service";
import { TeachersService } from "./teachers.service";

let teachersService: TeachersService;
let masterclassService: MasterclassService;
let coursesService: CoursesService;

export function initCoursesServices(authService: IAuthService) {
  teachersService = new TeachersService(authService);
  masterclassService = new MasterclassService(authService);
  coursesService = new CoursesService(authService);
}

export { teachersService, masterclassService, coursesService };
