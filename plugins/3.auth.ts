import { usersService } from "~/lib/modules/users/services";
import { useAuthStore } from "~~/store/auth.store";

export default defineNuxtPlugin(async (nuxtApp) => {
  const token = useCookie("token");

  const authStore = useAuthStore();

  if (token.value) {
    try {
      const response = await usersService.getLoggedUser();
      const { user } = response;
      authStore.setUser(user);
    } catch (err) {
      authStore.logout();
    }
  }
});
