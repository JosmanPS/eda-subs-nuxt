import { User } from "../../users/entities/user.entity";

export interface TeacherLink {
  name: string;
  url: string;
  icon: string;
}

export interface Teacher {
  id: string;
  name: string;
  lastName: string;
  email: string;
  picture: {
    url: string;
  };
  userId?: string;
  user?: User;
  description: string;
  links: TeacherLink[];
}
