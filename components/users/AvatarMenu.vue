<template>
  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <button v-bind="props">
        <UsersAvatar :user="user" />
      </button>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        :to="item.url"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <div v-if="user.isStaff">
        <v-list-item
          v-for="(item, index) in staffLinks"
          :key="index"
          :value="index"
          :to="item.url"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-list-item @click="logout">
        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { User } from "~/lib/modules/users/entities/user.entity";
import { useAuthStore } from "~/store/auth.store";

const items = [{ title: "Dashboard", url: "/dashboard" }];
const staffLinks = [{ title: "Admin", url: "/admin" }];

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const authStore = useAuthStore()

function logout() {
  authStore.logout()
  window.location.pathname = '/login'
}
</script>
