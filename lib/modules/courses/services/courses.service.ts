import { BaseAPI } from "../../shared/infra/services/base-api.service";
import { GetAllCoursesDTO } from "../dtos/get-all-courses.dto";

export class CoursesService extends BaseAPI {
  async getAllPreview(): Promise<GetAllCoursesDTO> {
    const data = await this.get('/cursos-preview')
    console.log("🚀 ~ file: courses.service.ts:7 ~ CoursesService ~ getAllPreview ~ data:", data)
    return { courses: data.data.cursos }
  }
}
