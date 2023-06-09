<template>
  <div>
    <v-icon v-if="value=== true" color="success">mdi-check</v-icon>
    <v-icon v-else color="error">mdi-close</v-icon>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: Boolean
})
</script>
