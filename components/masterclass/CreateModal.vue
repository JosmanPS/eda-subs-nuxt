<template>
  <div>
    <v-dialog v-model="showDialog" width="800" @click:outside="close()">
      <v-card>
        <v-card-title>CREAR NUEVA MASTERCLASS</v-card-title>
        <v-card-text>
          <v-form ref="createForm" @submit.prevent="submit">
            <v-text-field
              v-model="form.title"
              label="Título"
              required
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-text-field
              v-model="form.slug"
              label="Slug"
              required
              :rules="[(v) => !!v || 'Este campo es requerido.']"
            ></v-text-field>
            <v-file-input
              v-model="form.image"
              label="Imagen"
              :rules="[(v) => v.length > 0 || 'Este campo es requerido.']"
            ></v-file-input>
            <v-select
              v-model="form.teachersIds"
              label="Maestros"
              multiple
              :items="teachers"
              item-title="name"
              item-value="id"
            ></v-select>
            <v-alert v-if="error" color="error" variant="tonal" class="mb-6">{{
              error
            }}</v-alert>
            <v-btn color="primary" block type="submit"> Guardar </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="success" multi-line color="success">
      La masterclass se ha creado exitosamente
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { CreateMasterclassDTO } from "~/lib/modules/courses/dtos/create-masterclass.dto";
import { useMasterclassStore } from "~/store/masterclass.store";
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
  title: "",
  slug: "",
  image: [] as Array<File>,
  teachersIds: [] as string[],
});

const success = ref(false);
const error = ref("");

const masterclassStore = useMasterclassStore();
const teachersStore = useTeachersStore();

const teachers = computed(() => teachersStore.teachers);

onMounted(() => teachersStore.getAllTeachers());

async function submit() {
  try {
    success.value = false;
    error.value = "";

    const { valid } = await createForm.value.validate();

    if (valid) {
      const { image, ...data } = form.value;
      const dto: CreateMasterclassDTO = {
        ...data,
        image: image[0],
      };

      await masterclassStore.createMasterclass(dto);
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
    title: "",
    slug: "",
    image: [] as Array<File>,
    teachersIds: [] as string[],
  };
  error.value = "";
}
</script>
