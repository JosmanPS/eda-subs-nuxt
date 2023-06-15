<template>
  <div>
    <v-dialog v-model="showDialog" width="800" @click:outside="close()">
      <v-card>
        <v-card-title>CREAR NUEVO MAESTRO</v-card-title>
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
            <v-file-input v-model="form.picture" label="Imagen"></v-file-input>
            <v-text-field
              v-model="form.description"
              label="Descripción"
            ></v-text-field>
            <v-alert v-if="error" color="error" variant="tonal" class="mb-6">{{
              error
            }}</v-alert>
            <v-btn color="primary" block type="submit"> Guardar </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="success" multi-line color="success">
      El maestro se ha creado exitosamente
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { EmailUtils } from "~/lib/modules/shared/utils/email.utils";
import { CreateTeacherDTO } from "~/lib/modules/courses/dtos/create-teacher.dto";
import { useTeachersStore } from "~/store/teachers.store";

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
  description: "",
  picture: [] as Array<File>,
});

const success = ref(false);
const error = ref("");

const teachersStore = useTeachersStore();

async function submit() {
  try {
    success.value = false;
    error.value = "";

    const { valid } = await createForm.value.validate();

    if (valid) {
      const { picture, ...data } = form.value;
      const dto: CreateTeacherDTO = {
        ...data,
        links: [],
      };

      if (picture) {
        dto.picture = picture[0];
      }

      await teachersStore.createTeacher(dto);
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
    description: "",
    picture: [],
  };
  error.value = "";
}
</script>
