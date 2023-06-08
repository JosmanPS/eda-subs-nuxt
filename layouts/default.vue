<template>
  <v-app>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon
        @click="drawerState = !drawerState"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </v-app>
</template>

<script setup lang="ts">
const drawerState = ref(true);
</script>
