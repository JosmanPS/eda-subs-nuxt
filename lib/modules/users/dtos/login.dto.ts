import { JWTToken } from "../../auth/entities/tokens.entity";
import { User } from "../entities/user.entity";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token: JWTToken;
  user: User;
}
