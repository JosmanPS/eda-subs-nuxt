export interface UpdateUserDTO {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  isStaff?: boolean;
  isSuperAdmin?: boolean;
}
