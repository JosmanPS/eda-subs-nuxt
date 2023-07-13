<template>
  <div>
    <v-container class="py-12">
      <h1 class="text-4xl mb-8">Masterclass</h1>

      <v-card>
        <v-card-title>Todas los clases</v-card-title>
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
        <v-data-table
          :items="masterclasses"
          :search="search"
          :headers="headers"
        >
          <template v-slot:item.image="{ item }">
            <v-img :src="item.raw.image" width="100" class="p-1 rounded-sm" />
          </template>
          <template v-slot:item.teachers="{ item }">
            <TeachersAvatar
              v-for="teacher in item.raw.teachers"
              :key="teacher.id"
              :teacher="teacher.teacher"
            />
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

    <MasterclassCreateModal
      :dialog="showModal"
      @close="showModal = false"
      @success="reloadMasterclass"
    />
  </div>
</template>

<script setup lang="ts">
import { MasterClass } from "~/lib/modules/courses/entities/masterclass.entity";
import { useMasterclassStore } from "~/store/masterclass.store";
import { useNotificationsStore } from "~/store/notifications.store";

definePageMeta({
  layout: "admin",
  middleware: "is-staff",
});

const masterclassStore = useMasterclassStore();
const notificationsStore = useNotificationsStore();

const search = ref("");

const showModal = ref(false);

const masterclasses = computed(() => masterclassStore.masterclass);

const headers = [
  { title: "", key: "image", sortable: false },
  { title: "Título", key: "title" },
  { title: "Slug", key: "slug" },
  { title: "Maestros", key: "teachers" },
  { title: "Acciones", key: "actions", align: "end", sortable: false },
];

function reloadMasterclass() {
  masterclassStore.getAllMasterclass();
}

onMounted(() => {
  reloadMasterclass();
});
</script>
