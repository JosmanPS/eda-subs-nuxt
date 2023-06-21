<template>
  <div>
    <v-container class="py-12">
      <h1 class="text-4xl mb-8">Maestros</h1>

      <v-card>
        <v-card-title>Todos los maestros</v-card-title>
        <v-card-text>
          <div class="flex justify-between items-center pt-3">
            <v-responsive max-width="300">
              <v-text-field
                v-model="search"
                placeholder="Buscar"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                density="compact"
              ></v-text-field>
            </v-responsive>
            <div class="pb-2">
              <v-btn color="primary" class="mr-2" @click="showModal = true"
                ><v-icon>mdi-plus</v-icon> Agregar</v-btn
              >
              <v-btn color="light" variant="outlined"
                ><v-icon>mdi-download</v-icon> Descargar</v-btn
              >
            </div>
          </div>
        </v-card-text>
        <v-data-table :items="teachers" :search="search" :headers="headers">
          <template v-slot:item.avatar="{ item }">
            <TeachersAvatar :teacher="item.raw" />
          </template>
          <template v-slot:item.actions="{ item }">
            <div>
              <v-btn
                size="sm"
                class="mr-2"
                icon
                @click="() => openUpdateModal(item.raw)"
                ><v-icon color="info">mdi-pencil</v-icon></v-btn
              >
              <v-btn size="sm" icon @click="() => deleteTeacher(item.raw.id)"
                ><v-icon color="error">mdi-delete</v-icon></v-btn
              >
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <TeachersCreateModal
      :dialog="showModal"
      @close="showModal = false"
      @success="reloadTeachers"
    />

    <TeachersUpdateModal
      v-if="updateSelectedTeacher"
      :dialog="showUpdateModal"
      :teacher="updateSelectedTeacher"
      @close="showUpdateModal = false"
      @success="reloadTeachers"
    />
  </div>
</template>

<script setup lang="ts">
import { Teacher } from "~/lib/modules/courses/entities/teacher.entity";
import { useNotificationsStore } from "~/store/notifications.store";
import { useTeachersStore } from "~/store/teachers.store";

definePageMeta({
  layout: "admin",
  middleware: "is-staff",
});

const teachersStore = useTeachersStore();
const notificationsStore = useNotificationsStore();

const search = ref("");
const showModal = ref(false);

const teachers = computed(() => teachersStore.teachers);

const headers = [
  { title: "", key: "avatar", sortable: false },
  { title: "Nombre", key: "name" },
  { title: "Apellido", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "Acciones", key: "actions", align: "end", sortable: false },
];

function reloadTeachers() {
  teachersStore.getAllTeachers();
}

onMounted(() => {
  teachersStore.getAllTeachers();
});

const showUpdateModal = ref(false);
const updateSelectedTeacher = ref<Teacher | null>(null);

function openUpdateModal(teacher: Teacher) {
  updateSelectedTeacher.value = teacher;
  showUpdateModal.value = true;
}

async function deleteTeacher(teacherId: string) {
  const conf = confirm(
    "¿Estás seguro que deseas eliminar este maestro? Toda la información relacionada se perderá."
  );

  if (conf) {
    try {
      await teachersStore.deleteTeacher(teacherId);
      notificationsStore.showSuccessMessage("El usuario se ha eliminado");
      await reloadTeachers();
    } catch (err) {
      notificationsStore.showErrorMessage(`Error: ${String(err)}`);
    }
  }
}
</script>
