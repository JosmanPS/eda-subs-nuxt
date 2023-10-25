<template>
  <div class="flex flex-row align-middle">
    <v-avatar v-if="teacher.picture" :image="teacher.picture.url"></v-avatar>
    <v-avatar v-else color="primary">
      <span class="text-h5">{{ initials }}</span>
    </v-avatar>
    <div class="ml-2 flex flex-col justify-center">
      <span><b>Instructor</b></span>
      <span>{{ teacher.name }} {{ teacher.lastName }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Teacher } from "~/lib/modules/courses/entities/teacher.entity";

const props = defineProps({
  teacher: {
    type: Object as PropType<Teacher>,
    required: true,
  },
});

const initials = props.teacher.name[0] + props.teacher.lastName[0];
</script>
