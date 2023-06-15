import { authService } from "~/lib/modules/auth/services";
import { initCoursesServices } from "~/lib/modules/courses/services";
import { initUserServices } from "~/lib/modules/users/services";

export default defineNuxtPlugin((nuxtApp) => {
  initUserServices(authService);
  initCoursesServices(authService);
});
