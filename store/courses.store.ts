import { Course } from "~/lib/modules/courses/entities/course.entity";
import { coursesService } from "~/lib/modules/courses/services";

interface CoursesStoreState {
  coursesPreview: Course[];
  activeCourse: Course | null;
}

export const useCoursesStore = defineStore("courses", {
  state: (): CoursesStoreState => ({
    coursesPreview: [],
    activeCourse: null,
  }),

  actions: {
    async getAllCoursesPreview(): Promise<Course[]> {
      try {
        if (this.coursesPreview.length > 0) {
          return this.coursesPreview
        }
        const response = await coursesService.getAllPreview();
        this.coursesPreview = response.courses;
        return this.coursesPreview;
      } catch (err: any) {
        throw err || "Error desconocido";
      }
    },

    async getBySlug(slug:string): Promise<Course> {
      try {
        const response = await coursesService.getBySlug(slug);
        this.activeCourse = response.course
        return response.course;
      } catch (err: any) {
        throw err || "Error desconocido";
      }
    },
  },
});
