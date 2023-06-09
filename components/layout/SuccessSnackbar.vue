<template>
  <v-snackbar v-model="showSuccessNotification" multi-line color="success">
    {{ successMessage }}
  </v-snackbar>
</template>

<script lang="ts">
import { mapState, mapWritableState } from 'pinia';
import { useNotificationsStore } from '~~/store/notifications.store';

export default defineComponent({
  computed: {
    ...mapWritableState(useNotificationsStore, ['showSuccessNotification']),
    ...mapState(useNotificationsStore, ['successMessage']),
  }
})
</script>
