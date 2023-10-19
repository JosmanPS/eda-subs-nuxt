import { CreateUserDTO } from "~/lib/modules/users/dtos/create-user.dto";
import { UpdateUserDTO } from "~/lib/modules/users/dtos/updata-user.dto";
import { RegisterDTO } from "~/lib/modules/users/dtos/register.dto";
import { User } from "~/lib/modules/users/entities/user.entity";
import { usersService } from "~/lib/modules/users/services";

interface UsersStoreState {
  users: User[];
}

export const useUsersStore = defineStore("users", {
  state: (): UsersStoreState => ({
    users: [],
  }),

  actions: {
    setUsers(users: User[]) {
      this.users = users;
    },

    async getAllUsers() {
      try {
        const response = await usersService.getAllUsers();
        this.setUsers(response.users);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async createUser(dto: CreateUserDTO) {
      try {
        await usersService.createUser(dto);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async updateUser(userId: string, dto: UpdateUserDTO) {
      try {
        await usersService.updateUser(userId, dto);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async deleteUser(userId: string) {
      try {
        await usersService.deleteUser(userId);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async register(dto: RegisterDTO) {
      try {
        await usersService.register(dto);
      } catch (err: any) {
        throw err?.response?.data?.error?.message || "Error desconocido";
      }
    },
  },
});
