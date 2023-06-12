<template>
  <div>
    <v-dialog v-model="showDialog" width="800" @click:outside="close()">
      <v-card>
        <v-card-title>EDITAR USUARIO</v-card-title>
        <v-card-text>
          <v-form ref="updateForm" @submit.prevent="submit">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.lastName"
              label="Apellidos"
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.email"
              label="E-Mail"
              type="email"
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
              hint="Deja el campo en blanco para mantener la contraseña actual."
              persistent-hint
            ></v-text-field>
            <v-text-field
              v-model="form.confirmPassword"
              label="Confirmar contraseña"
              :type="show2 ? 'text' : 'password'"
              :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="show2 = !show2"
              required
              :rules="[
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
      El usuario se ha actualizado exitosamente
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "nuxt/dist/app/compat/capi";
import { EmailUtils } from "~/lib/modules/shared/utils/email.utils";
import { UpdateUserDTO } from "~/lib/modules/users/dtos/updata-user.dto";
import { User } from "~/lib/modules/users/entities/user.entity";
import { useUsersStore } from "~/store/users.store";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const emit = defineEmits(["close", "success"]);

const showDialog = computed(() => {
  return props.dialog;
});

const updateForm = ref<any>(null);

const form = ref({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isVerified: false,
  isStaff: false,
  isSuperAdmin: false,
});

const show1 = ref(false);
const show2 = ref(false);

onMounted(() => {
  form.value = { ...props.user, password: "", confirmPassword: "" };
});

watch(
  () => props.user,
  (newUser, prevUser) => {
    form.value = { ...newUser, password: "", confirmPassword: "" };
  }
);

const success = ref(false);
const error = ref("");

const usersStore = useUsersStore();

async function submit() {
  try {
    success.value = false;
    error.value = "";

    const { valid } = await updateForm.value.validate();

    if (valid) {
      const {
        name,
        lastName,
        email,
        isStaff,
        isSuperAdmin,
        password,
        isVerified,
      } = form.value;
      const dto: UpdateUserDTO = {
        name,
        lastName,
        email,
        isStaff,
        isSuperAdmin,
        password,
        isVerified,
      };
      await usersStore.updateUser(props.user.id, dto);
      emit("close");
      emit("success");
      success.value = true;
      updateForm.value.reset();
    }
  } catch (err) {
    console.error(err);
    error.value = String(err);
  }
}

function close() {
  emit("close");
}
</script>
