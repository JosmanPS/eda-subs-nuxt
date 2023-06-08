// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  build: {
    transpile: ["vuetify", ({ isDev }) => !isDev && "lodash"],
  },
  modules: ["@nuxtjs/tailwindcss"],
});
