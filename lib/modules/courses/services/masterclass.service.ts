import { BaseAPI } from "../../shared/infra/services/base-api.service";
import { CreateMasterclassDTO } from "../dtos/create-masterclass.dto";
import { GetAllMasterclassResponseDTO } from "../dtos/get-all-masterclass.dto";

export class MasterclassService extends BaseAPI {
  async getAllPreview(): Promise<GetAllMasterclassResponseDTO> {
    const token = this.authService.getToken("access-token");
    const response = await this.get("/masterclass/preview", null, null);
    const data = response.data as GetAllMasterclassResponseDTO;
    return data;
  }

  async getAll(): Promise<GetAllMasterclassResponseDTO> {
    const token = this.authService.getToken("access-token");
    const response = await this.get("/masterclass", null, {
      authorization: `Bearer ${token}`,
    });
    const data = response.data as GetAllMasterclassResponseDTO;
    return data;
  }

  async create(dto: CreateMasterclassDTO): Promise<void> {
    const token = this.authService.getToken("access-token");

    const data = new FormData();

    data.append("title", dto.title);
    data.append("slug", dto.slug);
    data.append("image", dto.image);
    data.append("teachersIds", JSON.stringify(dto.teachersIds));

    await this.post("/masterclass", data, null, {
      authorization: `Bearer ${token}`,
    });
    return;
  }
}
