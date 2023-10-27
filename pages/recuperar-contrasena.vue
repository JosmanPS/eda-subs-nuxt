<template>
  <section class="py-16 p-4">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="max-w-xl mx-auto">
        <v-card elevation="8" class="shadow-xl">
          <v-card-title>Recupera tu contraseña</v-card-title>
          <v-card-subtitle
            >Escribe tu dirección de correo electrónico para recibir un enlace
            de cambio de contraseña</v-card-subtitle
          >
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                required
              ></v-text-field>

              <v-alert
                v-if="success"
                class="mb-6"
                variant="tonal"
                type="success"
                >Se te ha enviado un correo electrónico con un enlace para
                cambiar tu contraseña.</v-alert
              >
              <v-alert v-if="error" class="mb-6" variant="tonal" type="error">{{
                error
              }}</v-alert>

              <div class="mb-6">
                <button
                  type="submit"
                  class="w-full text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition p-3"
                >
                  Recuperar contraseña
                </button>
              </div>
              <div>
                <p class="text-slate-500">
                  ¿No tienes una cuenta aún?{{ " " }}
                  <NuxtLink to="/registro" class="text-red-500">
                    Regístrate
                  </NuxtLink>
                </p>
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

const email = ref("");
const error = ref("");
const success = ref(false);

const authStore = useAuthStore();

async function submit() {
  try {
    error.value = "";
    success.value = false;
    const res = await authStore.sendRecoverPasswordMail(email.value);
    success.value = true;
  } catch (err) {
    error.value = String(err);
  }
}
</script>
