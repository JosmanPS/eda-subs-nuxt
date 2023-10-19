import { JWTToken } from "../../auth/entities/tokens.entity";
import { User } from "../entities/user.entity";

export interface LoginDTO {
  identifier: string;
  password: string;
}

export interface LoginResponseDTO {
  jwt: JWTToken;
  user: User;
}
