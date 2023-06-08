<template>
  <v-avatar color="primary">
    <span class="text-h5">{{ initials }}</span>
  </v-avatar>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { User } from "~/lib/modules/users/entities/user.entity";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const initials = props.user.name[0] + props.user.lastName[0];
</script>
