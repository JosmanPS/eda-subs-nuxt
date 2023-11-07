
  <template>
  <v-card>
    <v-tabs v-model="tab" color="red-accent-2" align-tabs="center">
      <v-tab value="description">Descripción</v-tab>
      <v-tab value="modules">Módulos</v-tab>
      <v-tab value="teacher">Instructor</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="description">
          <v-container fluid>
            <div
              v-html="description"
              class="prose lg:prose-xl prose-neutral prose-invert w-full"
            ></div>
          </v-container>
        </v-window-item>
        <v-window-item value="modules">
          <v-list>
            <v-list-group
              v-for="mod in course.modules"
              :key="mod.uuid"
              :value="mod.title"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :title="mod.title"
                  prepend-icon="mdi-list-box"
                ></v-list-item>
              </template>
              <v-list-item
                v-for="lesson in mod.lessons"
                :key="lesson.uuid"
                :title="lesson.title"
                prepend-icon="mdi-video"
                :to="`/cursos/${course.slug}/${lesson.uuid}`"
              >
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-window-item>
        <v-window-item value="teacher">
          <v-container fluid>
            <TeachersAvatar :teacher="course.teacher" />
          </v-container>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { PropType } from "vue";
import { Course } from "~/lib/modules/courses/entities/course.entity";
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true,
  },
});

const tab = ref("description");

onMounted(() => {
  const isLogged = !!authStore.user;
  if (isLogged) {
    tab.value = "modules";
  }
});

const description = computed(() => marked(props.course.description || ''))

</script>
