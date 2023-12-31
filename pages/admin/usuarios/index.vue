<template>
  <div>
    <v-container class="py-12">
      <h1 class="text-4xl mb-8">Usuarios</h1>

      <v-card>
        <v-card-title>Todos los usuarios</v-card-title>
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
        <v-data-table :items="users" :headers="headers" :search="search">
          <template v-slot:item.isStaff="{ item }">
            <DataBooleanIcon :value="item.raw.isStaff" />
          </template>
          <template v-slot:item.isVerified="{ item }">
            <DataBooleanIcon :value="item.raw.isVerified" />
          </template>
          <template v-slot:item.isSuperAdmin="{ item }">
            <DataBooleanIcon :value="item.raw.isSuperAdmin" />
          </template>
          <template v-slot:item.actions="{ item }">
            <div>
              <v-btn size="sm" class="mr-2" icon @click="() => openUpdateModal(item.raw)"
                ><v-icon color="info">mdi-pencil</v-icon></v-btn
              >
              <v-btn size="sm" icon @click="() => deleteUser(item.raw.id)"
                ><v-icon color="error">mdi-delete</v-icon></v-btn
              >
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <UsersCreateModal
      :dialog="showModal"
      @close="showModal = false"
      @success="reloadUsers"
    />

    <UsersUpdateModal
      v-if="userSelected"
      :dialog="showUpdateModal"
      :user="userSelected"
      @close="showUpdateModal = false"
      @success="reloadUsers"
    />
  </div>
</template>

<script setup lang="ts">
import { User } from "~/lib/modules/users/entities/user.entity";
import { useNotificationsStore } from "~/store/notifications.store";
import { useUsersStore } from "~/store/users.store";

definePageMeta({
  layout: "admin",
  middleware: "is-staff",
});

const usersStore = useUsersStore();

const users = computed(() => usersStore.users);

const headers = [
  { title: "Nombre", key: "name" },
  { title: "Apellido", key: "lastName" },
  { title: "Email", key: "email" },
  { title: "Verificado", key: "isVerified", align: "center" },
  { title: "Staff", key: "isStaff", align: "center" },
  { title: "SuperAdmin", key: "isSuperAdmin", align: "center" },
  { title: "Acciones", key: "actions", align: "end", sortable: false },
];

function reloadUsers() {
  usersStore.getAllUsers();
}

onMounted(() => {
  reloadUsers();
});

const search = ref("");

const showModal = ref(false);

const notificationsStore = useNotificationsStore();

async function deleteUser(userId: string) {
  const conf = confirm(
    "¿Estás seguro que deseas eliminar este usuario? Toda la información relacionada se perderá."
  );

  if (conf) {
    try {
      await usersStore.deleteUser(userId);
      notificationsStore.showSuccessMessage("El usuario se ha eliminado");
      await reloadUsers();
    } catch (err) {
      notificationsStore.showErrorMessage(`Error: ${String(err)}`);
    }
  }
}

const showUpdateModal = ref(false);
const userSelected = ref<User | null>(null);

function openUpdateModal(user: User) {
  userSelected.value = user;
  showUpdateModal.value = true;
}
</script>
