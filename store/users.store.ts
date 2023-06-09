import { CreateUserDTO } from "~/lib/modules/users/dtos/create-user.dto";
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
        await usersService.createUser(dto)
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },
  },
});
