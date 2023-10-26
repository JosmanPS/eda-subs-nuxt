<template>
  <div>
    <div v-if="!isAuth">
      <section>
        <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
          <v-alert type="error"
            >Debes iniciar sesión para ver este contenido.</v-alert
          >
        </div>
      </section>
    </div>
    <div v-else>
      <div v-if="masterclass">
        <section class="bg-neutral-800 shadow">
          <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
            <v-breadcrumbs :items="breadcrumbsItems" />
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
            <div class="">
              <TeachersAvatar :teacher="masterclass.teacher" />
            </div>
          </div>
        </section>
        <section>
          <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
            <div
              v-html="content"
              class="prose lg:prose-xl prose-neutral prose-invert mx-auto"
            ></div>
          </div>
        </section>
      </div>
      <div v-else>
        <section>
          <div class="mx-auto z-20 w-full max-w-screen-xl py-12 px-4 lg:py-28">
            <v-alert type="error">{{ error }}</v-alert>
          </div>
        </section>
      </div>
    </div>
  </div>
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

const breadcrumbsItems = [
  { title: "Inicio", to: "/" },
  { title: "Masterclass", to: "/masterclass", disabled: false },
];
</script>
