<template>
  <div>
    <div v-if="!isAuth">
      <section>
        <LayoutContainer>
          <v-alert type="error">
            Debes <NuxtLink class="underline font-semibold" to="/login">iniciar sesión</NuxtLink> para ver este contenido.
          </v-alert>
        </LayoutContainer>
      </section>
    </div>
    <div v-else>
      <div v-if="course">
        <section class="bg-neutral-800 shadow">
          <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
            <v-breadcrumbs :items="breadcrumbsItems" />
            <h1 class="text-white text-4xl mb-6 font-semibold">
              {{ course.title }}
            </h1>
            <div class="mb-8">
              <TagsChip
                v-for="tag in course.tags"
                :key="tag.slug"
                :tag="tag"
                class="mr-2"
              />
            </div>
            <div class="">
              <TeachersAvatar :teacher="course.teacher" />
            </div>
          </div>
        </section>
        <section>
          <LayoutContainer>
            <CoursesTabs :course="course"></CoursesTabs>
          </LayoutContainer>
        </section>
      </div>
      <div v-else>
        <section>
          <LayoutContainer>
            <v-alert type="error">{{ error }}</v-alert>
          </LayoutContainer>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { coursesService } from "~/lib/modules/courses/services";
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();

const isAuth = computed(() => !!authStore.user);


const route = useRoute();
const slug = route.params.slug as string;

const { data: course, error } = await useAsyncData(
  "course",
  async () => (await coursesService.getBySlug(slug)).course
);

const breadcrumbsItems = [
  { title: "Inicio", to: "/" },
  { title: "Cursos", to: "/cursos", disabled: false },
];
</script>
