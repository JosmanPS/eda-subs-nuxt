<template>
  <div>
    <TypoH2>Últimos Cursos</TypoH2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <CoursesCard
        v-for="course in courses"
        :key="course.uuid"
        :course="course"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCoursesStore } from "~/store/courses.store";

const coursesStore = useCoursesStore();

const courses = computed(() => coursesStore.coursesPreview);

onMounted(() => {
  coursesStore.getAllCoursesPreview().then(()=> console.log(coursesStore.coursesPreview))
})
</script>
