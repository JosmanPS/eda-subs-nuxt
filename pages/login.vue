<template>
  <section class="py-16 p-4">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="max-w-xl mx-auto">
        <v-card elevation="8" class="shadow-xl">
          <v-card-title>Bienvenido</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="form.identifier"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                label="Contraseña"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                required
                @click:append="show = !show"
              ></v-text-field>

              <div class="text-right mb-6">
                <NuxtLink
                  to="/recuperar-contrasena"
                  class="text-red-500 text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </NuxtLink>
              </div>

              <v-alert v-if="error" class="mb-6" variant="tonal" type="error">{{ error }}</v-alert>

              <div class="mb-6">
                <button
                  type="submit"
                  class="w-full text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition p-3"
                >
                  Iniciar sesión
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
  middleware: 'guest'
})

const form = ref({ identifier: "", password: "" });
const error = ref('')
const show = ref(false);

const authStore = useAuthStore();

async function submit() {
  try {
    error.value = ''
    const res = await authStore.login(form.value);
    window.location.pathname = '/dashboard'
  } catch (err) {
    error.value = String(err);
  }
}
</script>
