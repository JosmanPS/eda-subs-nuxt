<template>
  <div>
    <v-container class="py-12">
      <div v-if="!isAuth">
      </div>
      <div v-else>
        <div v-if="course"></div>
        <div v-else>
          <v-alert type="error">{{ error }}</v-alert>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import { useCoursesStore } from "~/store/courses.store";

definePageMeta({
  layout: "course",
});

const route = useRoute();
const slug = route.params.slug as string;

const authStore = useAuthStore();
const coursesStore = useCoursesStore();

const isAuth = computed(() => !!authStore.user);

const { data, error } = await useAsyncData(
  "course",
  async () => await coursesStore.getBySlug(slug)
);

const course = computed(() => coursesStore.activeCourse);
</script>
