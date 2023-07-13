import { CreateMasterclassDTO } from "~/lib/modules/courses/dtos/create-masterclass.dto";
import { MasterClass } from "~/lib/modules/courses/entities/masterclass.entity";
import { masterclassService } from "~/lib/modules/courses/services";

interface MasterclassStoreState {
  masterclass: MasterClass[];
}

export const useMasterclassStore = defineStore("masterclass", {
  state: (): MasterclassStoreState => ({
    masterclass: [],
  }),

  actions: {
    async getAllMasterclass(): Promise<MasterClass[]> {
      try {
        const response = await masterclassService.getAll();
        this.masterclass = response.masterclass;
        return this.masterclass;
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },

    async createMasterclass(dto: CreateMasterclassDTO): Promise<void> {
      try {
        await masterclassService.create(dto);
      } catch (err: any) {
        throw err?.response?.data?.message || "Error desconocido";
      }
    },
  },
});
