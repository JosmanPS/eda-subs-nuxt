<template>
  <section class="py-16 p-4">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="max-w-xl mx-auto">
        <v-card elevation="8" class="shadow-xl">
          <v-card-title>Crear Cuenta</v-card-title>
          <v-card-subtitle
            >Llena los datos para crear tu cuenta</v-card-subtitle
          >
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="form.name"
                label="Nombre"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.lastName"
                label="Apellido"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.email"
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
              <v-text-field
                v-model="form.passwordConfirmation"
                label="Confirmar contraseña"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                prepend-icon="mdi-lock"
                required
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-form>
            <v-alert v-if="error" class="mb-6" variant="tonal" type="error">{{
              error
            }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <button
              type="submit"
              class="w-full text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition p-3"
              @click.prevent="submit"
            >
              Registrarte
            </button>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RegisterDTO } from "~/lib/modules/users/dtos/register.dto";
import { useNotificationsStore } from "~/store/notifications.store";
import { useUsersStore } from "~/store/users.store";

const form = ref({
  name: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const show = ref(false);
const show2 = ref(false);

const error = ref("");

const usersStore = useUsersStore();
const notificationsStore = useNotificationsStore();

async function submit() {
  try {
    error.value = "";

    const dto: RegisterDTO = { ...form.value, username: form.value.email };
    await usersStore.register(dto);
    notificationsStore.showSuccessMessage(
      "Se ha creado un usuario. Verifica tu correo electrónico para confirmar tu cuenta."
    );
  } catch (err) {
    error.value = String(err);
    console.error(err);
  }
}
</script>
