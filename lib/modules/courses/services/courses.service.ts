import { BaseAPI } from "../../shared/infra/services/base-api.service";
import { GetAllCoursesDTO } from "../dtos/get-all-courses.dto";
import { Course } from "../entities/course.entity";

export class CoursesService extends BaseAPI {
  async getAllPreview(): Promise<GetAllCoursesDTO> {
    const data = await this.get('/cursos-preview')
    return { courses: data.data.cursos }
  }

  async getBySlug(slug: string): Promise<{course: Course}> {
    const token = this.authService.getToken("access-token");
    const response = await this.get(`/cursos/${slug}`, null, {
      authorization: `Bearer ${token}`
    })
    return { course: response.data }
  }
}
