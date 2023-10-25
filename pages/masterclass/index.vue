<template>
  <section>
    <div class="mx-auto z-20 w-full max-w-screen-xl py-24 lg:py-28">
      <h2 class="text-white text-3xl mb-6 font-semibold">
        Últimas Masterclass
      </h2>
      <div v-if="error"></div>
      <div v-else class="grid grid-cols-4">
        <MasterclassCard
          v-for="mc in masterclass"
          :masterclass="mc"
          :key="mc.id"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MasterClass } from "~/lib/modules/courses/entities/masterclass.entity";
import { useMasterclassStore } from "~/store/masterclass.store";

const masterclassStore = useMasterclassStore();

const { data: masterclass , error } = await useAsyncData('masterclass', () => masterclassStore.getAllMasterclassPreview())



</script>
