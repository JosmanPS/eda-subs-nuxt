<template>
  <v-app>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon
        @click="drawerState = !drawerState"
      ></v-app-bar-nav-icon>
      <v-container v-if="user">
        <div class="flex w-full justify-end">
          <UsersAvatarMenu :user="user" />
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerState">
      <v-img src="/eda.svg" class="py-5 px-4"></v-img>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :title="item.title"
          :prepend-icon="item.icon"
          :to="item.to"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Cerrar sesión"
          @click="logoutAndRedirect"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>

    <LayoutErrorSnackbar />
    <LayoutSuccessSnackbar />

    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

const drawerState = ref(false);

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const menuItems = [
  { icon: "mdi-view-dashboard", title: "Dashboard", to: "/dashboard" },
  { icon: "mdi-account", title: "Usuarios", to: "/admin/usuarios" },
  { icon: "mdi-human-male-board", title: "Maestros", to: "/admin/maestros" },
  { icon: "mdi-video", title: "Masterclass", to: "/admin/masterclass" },
];

function logoutAndRedirect() {
  authStore.logout();
  window.location.pathname = "/login";
}
</script>
