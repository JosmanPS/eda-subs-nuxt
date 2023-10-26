<template>
  <div>
    <h2 class="text-white text-3xl mb-6 font-semibold">Últimas Masterclass</h2>
    <div v-if="error"></div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <MasterclassCard
        v-for="mc in masterclass"
        :masterclass="mc"
        :key="mc.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MasterClass } from "~/lib/modules/courses/entities/masterclass.entity";

const props = defineProps({
  masterclass: {
    type: Array<MasterClass>,
  },
  error: {
    type: Object,
  },
});
</script>
