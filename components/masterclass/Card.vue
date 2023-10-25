<template>
  <v-card>
    <v-img :src="masterclass.thumbnail.url" :aspect-ratio="16/9" cover></v-img>
    <v-card-title>{{ masterclass.title }}</v-card-title>
    <v-card-text>
      <div>
        <TagsChip v-for="tag in masterclass.tags" :key="tag.slug" :tag="tag" class="mr-2" size="small" />
      </div>
      <div class="my-4">
        {{ masterclass.description }}
      </div>
      <TeachersAvatar :teacher="masterclass.teacher" />
    </v-card-text>
    <v-card-actions>
      <v-btn block color="primary">Ver lección</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MasterClass } from "~/lib/modules/courses/entities/masterclass.entity";

const props = defineProps({
  masterclass: {
    type: Object as PropType<MasterClass>,
    required: true,
  },
});
</script>
