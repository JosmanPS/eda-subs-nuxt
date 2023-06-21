import { CreateTeacherDTO } from "~/lib/modules/courses/dtos/create-teacher.dto";
import { UpdateTeacherDTO } from "~/lib/modules/courses/dtos/update-teacher.dto";
import { Teacher } from "~/lib/modules/courses/entities/teacher.entity";
import { teachersService } from "~/lib/modules/courses/services";

interface TeachersStoreState {
  teachers: Teacher[];
}

export const useTeachersStore = defineStore("teachers", {
  state: (): TeachersStoreState => ({
    teachers: [],
  }),

  actions: {
    setTeachers(teachers: Teacher[]) {
      this.teachers = teachers;
    },

    async getAllTeachers(): Promise<Teacher[]> {
      try {
        const response = await teachersService.getAll();
        const teachers = response.teachers;
        this.setTeachers(response.teachers);
        return teachers;
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async createTeacher(dto: CreateTeacherDTO) {
      try {
        await teachersService.create(dto);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async updateTeacher(dto: UpdateTeacherDTO) {
      try {
        await teachersService.updateTeacher(dto);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async deleteTeacher(teacherId: string) {
      try {
        await teachersService.deleteTeacher(teacherId);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },
  },
});
