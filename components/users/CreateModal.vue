<template>
  <div>
    <v-dialog v-model="showDialog" width="800" @click:outside="close()">
      <v-card>
        <v-card-title>CREAR NUEVO USUARIO</v-card-title>
        <v-card-text>
          <v-form ref="createForm" @submit.prevent="submit">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              required
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.lastName"
              label="Apellidos"
              required
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              label="E-Mail"
              type="email"
              required
              :rules="[
                (v) => !!v || 'Este campo es requerido.',
                (v) =>
                  EmailUtils.isValidEmail(v) ||
                  'El formato del email no es válido.',
              ]"
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              label="Contraseña"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              required
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.confirmPassword"
              label="Confirmar contraseña"
              :type="show2 ? 'text' : 'password'"
              :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show2 = !show2"
              required
              :rules="[
                (v) => !!v || 'Este campo es requerido.',
                (v) => v === form.password || 'Las contraseñas no coinciden.',
              ]"
            ></v-text-field>
            <v-checkbox v-model="form.isStaff" label="Es staff"></v-checkbox>
            <v-checkbox
              v-model="form.isSuperAdmin"
              label="Es superadmin"
            ></v-checkbox>
            <v-alert v-if="error" color="error" variant="tonal" class="mb-6">{{
              error
            }}</v-alert>
            <v-btn color="primary" block type="submit"> Guardar </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="success" multi-line color="success">
      El usuario se ha creado exitosamente
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { create } from "domain";
import { EmailUtils } from "~/lib/modules/shared/utils/email.utils";
import { CreateUserDTO } from "~/lib/modules/users/dtos/create-user.dto";
import { useUsersStore } from "~/store/users.store";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "success"]);

const showDialog = computed(() => {
  return props.dialog;
});

const createForm = ref<any>(null);

const form = ref({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isStaff: false,
  isSuperAdmin: false,
});

const show1 = ref(false);
const show2 = ref(false);

const success = ref(false);
const error = ref("");

const usersStore = useUsersStore();

async function submit() {
  try {
    success.value = false;
    error.value = "";

    const { valid } = await createForm.value.validate();

    if (valid) {
      const { name, lastName, email, isStaff, isSuperAdmin, password } =
        form.value;
      const dto: CreateUserDTO = {
        name,
        lastName,
        email,
        isStaff,
        isSuperAdmin,
        password,
      };
      await usersStore.createUser(dto);
      emit("close");
      emit("success");
      resetForm();
      success.value = true;
      createForm.value.reset();
    }
  } catch (err) {
    console.error(err);
    error.value = String(err);
  }
}

function close() {
  emit("close");
}

function resetForm() {
  form.value = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isStaff: false,
    isSuperAdmin: false,
  };
  error.value = "";
}
</script>
