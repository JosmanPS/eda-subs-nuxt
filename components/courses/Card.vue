<template>
  <v-card>
    <NuxtLink :to="`/cursos/${course.slug}`">
      <v-img
        :src="course.image.url"
        :aspect-ratio="16 / 9"
        cover
      ></v-img>
    </NuxtLink>
    <v-card-title>{{ course.title }}</v-card-title>
    <v-card-subtitle>{{ course.modules.length }} módulos</v-card-subtitle>
    <v-card-text>{{ course.previewDescription }}</v-card-text>
    <v-card-actions>
      <v-btn block color="primary" :to="`/cursos/${course.slug}`"
        >Ver curso</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Course } from "~/lib/modules/courses/entities/course.entity";

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true,
  },
});
</script>
