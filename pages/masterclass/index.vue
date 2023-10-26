<template>
  <section>
    <div class="mx-auto z-20 w-full max-w-screen-xl py-24 lg:py-28">
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
</script>
