<template>
  <section class="py-16 p-4">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="max-w-xl mx-auto">
        <v-card elevation="8" class="shadow-xl">
          <v-card-title>Cambiar contraseña</v-card-title>
          <v-card-subtitle
            >Escribe la nueva contraseña para tu cuenta</v-card-subtitle
          >
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="form.password"
                label="Contraseña"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                required
                @click:append="show = !show"
              ></v-text-field>
              <v-text-field
                v-model="form.passwordConfirmation"
                label="Confirmar contraseña"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                required
                @click:append="show2 = !show2"
              ></v-text-field>

              <v-alert
                v-if="success"
                class="mb-6"
                variant="tonal"
                type="success"
                >Se ha cambiado tu contraseña. <NuxtLink to="/login">Inicia sesión</NuxtLink> para continuar.</v-alert
              >
              <v-alert v-if="error" class="mb-6" variant="tonal" type="error">{{
                error
              }}</v-alert>

              <div>
                <button
                  type="submit"
                  class="w-full text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition p-3"
                >
                  Cambiar contraseña
                </button>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  middleware: "guest",
});

const route = useRoute();

const code = (route.query.code as string) || "";

const form = ref({
  password: '',
  passwordConfirmation: '',
})

const show = ref(false)
const show2 = ref(false)

const error = ref("");
const success = ref(false);

const authStore = useAuthStore();

async function submit() {
  try {
    error.value = "";
    success.value = false;
    const dto = {
      password: form.value.password,
      passwordConfirmation: form.value.passwordConfirmation,
      code
    }
    const res = await authStore.resetPassword(dto);
    success.value = true;
  } catch (err) {
    error.value = String(err);
  }
}
</script>
