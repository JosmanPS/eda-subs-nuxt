import { authService } from "~/lib/modules/auth/services";
import { initUserServices } from "~/lib/modules/users/services";

export default defineNuxtPlugin((nuxtApp) => {
  initUserServices(authService);
});
