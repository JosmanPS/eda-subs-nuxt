<template>
  <v-app>
    <v-app-bar app fixed>
      <div
        class="p-6 mx-auto w-full max-w-screen-xl flex items-center justify-between flex-wrap"
      >
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <NuxtLink to="/">
            <v-img src="eda.svg" width="150" alt="Escuela de Avivamiento" />
          </NuxtLink>
        </div>
        <div class="flex items-center w-auto">
          <div class="flex-grow">
            <NuxtLink
              v-for="link in links"
              :key="link.url"
              :to="link.url"
              class="inline-block mt-0 text-slate-300 hover:text-red-500 mr-4"
              >{{ link.name }}</NuxtLink
            >
          </div>
          <div v-if="user">
            <UsersAvatarMenu :user="user" />
          </div>
          <div v-else>
              <NuxtLink
                to="/login"
                class="inline-block mt-0 text-slate-300 hover:text-red-500 mr-4"
              >
                Iniciar sesión
              </NuxtLink>
              <NuxtLink
                to="/registro"
                class="inline-block px-4 py-2 leading-none border rounded text-white border-red-500 hover:border-transparent hover:text-red-500 hover:bg-white mt-0"
              >
                Regístrate
              </NuxtLink>
            </div>
        </div>
      </div>
    </v-app-bar>
    <v-main class="relative">
      <slot></slot>
    </v-main>
    <LayoutErrorSnackbar />
    <LayoutSuccessSnackbar />
    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const links = [
  { name: "Masterclass", url: "/masterclass" },
  { name: "Cursos", url: "/cursos" },
];

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>
