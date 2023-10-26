<template>
  <section>
    <div class="mx-auto z-20 w-full max-w-screen-xl py-12">
      <v-breadcrumbs :items="breadcrumbsItems" />
      <h1 class="text-white text-4xl mb-24 font-semibold">Dashboard</h1>

      <MasterclassLastItems :masterclass="masterclass" :error="error" />
    </div>
  </section>
</template>

<script setup lang="ts">

import { useMasterclassStore } from "~/store/masterclass.store";

const masterclassStore = useMasterclassStore();

const { data: masterclass, error } = await useAsyncData("masterclass", () =>
  masterclassStore.getAllMasterclassPreview()
);

const breadcrumbsItems = [
  { title: "Inicio", to: "/" },
  { title: "Dashboard", to: "/dashboard", disabled: true },
];

</script>
