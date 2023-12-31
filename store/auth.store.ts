import { LoginDTO } from "~~/lib/modules/users/dtos/login.dto";
import { ResetPasswordDTO } from "~~/lib/modules/users/dtos/reset-password.dto";
// import { RecoverPasswordDTO } from '~~/lib/modules/users/dtos/RecoverPasswordDTO'
import { User } from "~~/lib/modules/users/entities/user.entity";
import { authService, usersService } from "~~/lib/modules/users/services";

interface AuthStoreState {
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthStoreState => ({
    user: null,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user;
    },

    async login(dto: LoginDTO) {
      try {
        const data = await usersService.login(dto);
        console.log("🚀 ~ file: auth.store.ts:23 ~ login ~ data:", data)
        const todayDate = new Date();
        const expDate = new Date();

        expDate.setDate(todayDate.getDate() + 5);

        const token = useCookie("token", { expires: expDate });
        token.value = data.jwt;
        authService.setToken("access-token", data.jwt);

        this.setUser(data.user);

        return data.user;
      } catch (err: any) {
        throw err?.response?.data?.error?.message;
      }
    },

    async sendRecoverPasswordMail(email: string): Promise<void> {
      try {
        await usersService.forgotPassword(email)
      }
      catch (err: any) {
        throw err?.response?.data?.error?.message;
      }
    },

    async resetPassword(dto: ResetPasswordDTO): Promise<void> {
      try {
        await usersService.resetPassword(dto)
      } catch (err: any) {
        throw err?.response?.data?.error?.message;
      }
    },

    logout() {
      const token = useCookie("token");
      token.value = null;
      this.setUser(null);
      authService.removeToken("access-token");
      authService.removeToken("refresh-token");
      authService.removeCurrentUser();
    },
  },
});
