import { BaseAPI } from "../../shared/infra/services/base-api.service";
import { CreateTeacherDTO } from "../dtos/create-teacher.dto";
import { GetAllTeachersResponseDTO } from "../dtos/get-all-teachers.dto";
import { UpdateTeacherDTO } from "../dtos/update-teacher.dto";

export class TeachersService extends BaseAPI {
  async getAll(): Promise<GetAllTeachersResponseDTO> {
    const token = this.authService.getToken("access-token");
    const response = await this.get("/teachers", null, {
      authorization: `Bearer ${token}`,
    });
    const data = response.data as GetAllTeachersResponseDTO;
    return data;
  }

  async create(dto: CreateTeacherDTO): Promise<void> {
    const token = this.authService.getToken("access-token");

    const data = new FormData();
    data.append("name", dto.name);
    data.append("lastName", dto.lastName);
    data.append("email", dto.email);
    data.append("description", dto.description || "");

    const links = dto.links ? JSON.stringify(dto.links) : "[]";
    data.append("links", links);

    if (dto.picture) {
      data.append("picture", dto.picture);
    }

    if (dto.userId) {
      data.append("userId", dto.userId);
    }

    await this.post("/teachers", data, null, {
      authorization: `Bearer ${token}`,
    });
  }

  async deleteTeacher(teacherId: string): Promise<void> {
    const token = this.authService.getToken("access-token");
    await this.delete(`/teachers/${teacherId}`, null, null, {
      authorization: `Bearer ${token}`,
    });
  }

  async updateTeacher(dto: UpdateTeacherDTO): Promise<void> {
    const { teacherId } = dto;
    const token = this.authService.getToken("access-token");
    await this.put(`/teachers/${teacherId}`, dto, null, {
      authorization: `Bearer ${token}`,
    });
  }
}
