<template>
  <section>
    <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
      <div v-if="!isAuth">
        <v-alert type="error"
          >Debes iniciar sesión para ver este contenido.</v-alert
        >
      </div>
      <div v-if="error">
        <v-alert type="error">{{ error }}</v-alert>
      </div>
      <div v-if="masterclass">
        <h1 class="text-white text-4xl mb-6 font-semibold">
          {{ masterclass.title }}
        </h1>
        <div class="mb-8">
          <TagsChip
            v-for="tag in masterclass.tags"
            :key="tag.slug"
            :tag="tag"
            class="mr-2"
          />
        </div>
        <div class="mb-12">
          <TeachersAvatar :teacher="masterclass.teacher" />
        </div>
        <p>{{ masterclass.description }}</p>
        <hr class="my-12" />
        <div v-html="content" class="prose lg:prose-xl prose-slate prose-invert mx-auto"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { masterclassService } from "~/lib/modules/courses/services";
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();

const isAuth = computed(() => !!authStore.user);
const user = computed(() => authStore.user);

const route = useRoute();
const slug = route.params.slug as string;

const { data: masterclass, error } = await useAsyncData(
  "masterclass",
  async () => (await masterclassService.getBySlug(slug)).masterclass
);

const content = computed(() =>
  masterclass ? marked(masterclass.value.content) : ""
);
</script>
