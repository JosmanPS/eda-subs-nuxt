<template>
  <v-chip>{{ props.tag.title }}</v-chip>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Tag } from "~/lib/modules/courses/entities/tag.entity";

const props = defineProps({
  tag: {
    type: Object as PropType<Tag>,
    required: true,
  },
});
</script>
