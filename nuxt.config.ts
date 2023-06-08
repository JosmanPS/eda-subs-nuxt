// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["vuetify/lib/styles/main.sass", "~/assets/css/tailwind.css"],

  build: {
    transpile: ["vuetify", ({ isDev }) => !isDev && "lodash"],
  },

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  pinia: {
    autoImports: ["defineStore"],
  },

  app: {
    pageTransition: false,
    layoutTransition: false,
  },
});
