import { TeacherLink } from "../entities/teacher.entity";

export interface UpdateTeacherDTO {
  teacherId: string;
  name?: string;
  lastName?: string;
  email?: string;
  picture?: Blob;
  userId?: string;
  description?: string;
  links?: TeacherLink[];
}
