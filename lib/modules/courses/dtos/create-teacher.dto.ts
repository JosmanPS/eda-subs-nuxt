import { TeacherLink } from "../entities/teacher.entity";

export interface CreateTeacherDTO {
  name: string;
  lastName: string;
  email: string;
  picture?: Blob;
  userId?: string;
  description: string;
  links: TeacherLink[];
}
