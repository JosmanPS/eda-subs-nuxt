export interface CreateUserDTO {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isStaff: boolean;
  isSuperAdmin: boolean;
}
