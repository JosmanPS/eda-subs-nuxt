<template>
  <v-app>
    <v-app-bar app fixed>
      <v-app-bar-nav-icon
        @click="drawerState = !drawerState"
      ></v-app-bar-nav-icon>
      <v-container v-if="user">
        <div class="flex w-full justify-end items-center">
          <!-- <div class="flex-grow"> -->
            <NuxtLink
              v-for="link in links"
              :key="link.url"
              :to="link.url"
              class="inline-block mt-0 text-slate-300 hover:text-red-500 mr-4"
              >{{ link.name }}</NuxtLink
            >
          <!-- </div> -->
          <UsersAvatarMenu :user="user" />
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-if="course" v-model="drawerState" app>
      <v-img :src="course.image.url"></v-img>
      <v-list>
        <v-list-group
          v-for="mod in course.modules"
          :key="mod.uuid"
          :value="mod.uuid"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="mod.title"></v-list-item>
          </template>

          <v-list-item
            v-for="lesson in mod.lessons"
            :key="lesson.uuid"
            :title="lesson.title"
            :to="`/cursos/${course.slug}/${lesson.uuid}`"
            nav
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main app>
      <slot></slot>
    </v-main>

    <LayoutErrorSnackbar />
    <LayoutSuccessSnackbar />

    <LayoutFooter />
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useCoursesStore } from "~/store/courses.store";

const drawerState = ref(true);

const authStore = useAuthStore();
const courseStore = useCoursesStore();

const user = computed(() => authStore.user);

const course = computed(() => courseStore.activeCourse);

const links = [
  { name: "Masterclass", url: "/masterclass" },
  { name: "Cursos", url: "/cursos" },
];
</script>
