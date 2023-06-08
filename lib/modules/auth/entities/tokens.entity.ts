export type JWTToken = string;

export type RefreshToken = string;

export interface JWTTokenClaims {
  id: string;
  isVerified: boolean;
  name: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isSuperAdmin: boolean;
  //   sessionId?: string
}
