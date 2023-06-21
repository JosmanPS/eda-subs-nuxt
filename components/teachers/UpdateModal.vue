<template>
  <div>
    <v-dialog v-model="showDialog" width="800" @click:outside="close()">
      <v-card>
        <v-card-title>EDITAR MAESTRO</v-card-title>
        <v-card-text>
          <v-form ref="updateForm" @submit.prevent="submit">
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
            <v-file-input
              v-model="form.picture"
              label="Imagen"
              hint="Deja en blanco si no deseas cambiar la imagen."
              persistent-hint
            ></v-file-input>
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
      El maestro se ha actualizado exitosamente
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { EmailUtils } from "~/lib/modules/shared/utils/email.utils";
import { CreateTeacherDTO } from "~/lib/modules/courses/dtos/create-teacher.dto";
import { useTeachersStore } from "~/store/teachers.store";
import { Teacher } from "~/lib/modules/courses/entities/teacher.entity";
import { UpdateTeacherDTO } from "~/lib/modules/courses/dtos/update-teacher.dto";

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  teacher: {
    type: Object as PropType<Teacher>,
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
  description: "",
  picture: [] as Array<File>,
});

const success = ref(false);
const error = ref("");

const teachersStore = useTeachersStore();

onMounted(() => {
  const { id, picture, ...data } = props.teacher;
  form.value = { ...data, picture: [] }
});

watch(() => props.teacher, (newTeacher, oldTeacher) => {
  const { id, picture, ...data } = props.teacher;
  form.value = { ...data, picture: [] };
})

async function submit() {
  try {
    success.value = false;
    error.value = "";

    const { valid } = await updateForm.value.validate();

    if (valid) {
      const { picture, ...data } = form.value;
      const dto: UpdateTeacherDTO = {
        teacherId: props.teacher.id,
        ...data,
        links: [],
      };

      if (picture) {
        dto.picture = picture[0];
      }

      await teachersStore.updateTeacher(dto);
      emit("close");
      emit("success");
      resetForm();
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
