import { BaseAPI } from "../../shared/infra/services/base-api.service";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { GetAllUsersResponseDTO } from "../dtos/get-all-users.dto";
import { GetLoggedUserResponseDTO } from "../dtos/get-logged-user.dto";
import { LoginDTO, LoginResponseDTO } from "../dtos/login.dto";
import { RegisterDTO } from "../dtos/register.dto";
import { UpdateUserDTO } from "../dtos/updata-user.dto";
import { User } from "../entities/user.entity";

export class UsersService extends BaseAPI {
  async login(dto: LoginDTO): Promise<LoginResponseDTO> {
    const response = await this.post("/auth/local", dto);
    const data = response.data as LoginResponseDTO;
    this.authService.setToken("access-token", data.jwt);
    this.authService.setToken("refresh-token", data.jwt);
    this.authService.setCurrentUser(data.user);
    return data;
  }

  async logout(): Promise<void> {
    this.authService.removeToken("access-token");
    this.authService.removeToken("refresh-token");
    this.authService.removeCurrentUser();
  }

  async getLoggedUser(): Promise<GetLoggedUserResponseDTO> {
    const token = this.authService.getToken("access-token");
    const response = await this.get("/auth/me", null, {
      authorization: `Bearer ${token}`,
    });
    const data = response.data as GetLoggedUserResponseDTO;
    return data;
  }

  async getAllUsers(): Promise<GetAllUsersResponseDTO> {
    const token = this.authService.getToken("access-token");
    const response = await this.get("/users", null, {
      authorization: `Bearer ${token}`,
    });
    const data = response.data as GetAllUsersResponseDTO;
    return data;
  }

  async createUser(dto: CreateUserDTO): Promise<void> {
    const token = this.authService.getToken("access-token");
    await this.post("/users", dto, null, {
      authorization: `Bearer ${token}`,
    });
  }

  async updateUser(userId: string, dto: UpdateUserDTO): Promise<void> {
    const token = this.authService.getToken("access-token");
    await this.put(`/users/${userId}`, dto, null, {
      authorization: `Bearer ${token}`,
    });
  }

  async deleteUser(userId: string): Promise<void> {
    const token = this.authService.getToken("access-token");
    await this.delete(`/users/${userId}`, null, null, {
      authorization: `Bearer ${token}`,
    });
  }

  async register(dto: RegisterDTO): Promise<void> {
    await this.post("/auth/local/register", dto, null, null);
  }
}
