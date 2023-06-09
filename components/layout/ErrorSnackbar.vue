<template>
  <v-snackbar v-model="showErrorNotification" multi-line color="error">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script lang="ts">
import { mapState, mapWritableState } from 'pinia';
import { useNotificationsStore } from '~~/store/notifications.store';

export default defineComponent({
  computed: {
    ...mapWritableState(useNotificationsStore, ['showErrorNotification']),
    ...mapState(useNotificationsStore, ['errorMessage']),
  }
})
</script>
