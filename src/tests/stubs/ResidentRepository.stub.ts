import Resident from "../../domain/models/Resident";
import { IResidentRepository } from "../../domain/repositories/IResidentRepository";

export class StubResidentRepository implements IResidentRepository {
  getAll(): Resident[] {
    throw new Error("getAll: Method not implemented.");
  }
  getHouseResidents(houseNumber: string): Resident[] {
    throw new Error("getHouseResidents: Method not implemented.");
  }
  getById(id: string): Resident | undefined {
    throw new Error("getById: Method not implemented.");
  }
  getByRg(rg: string): Resident | null {
    throw new Error("getByRg: Method not implemented.");
  }
  save(resident: Resident): Resident {
    throw new Error("save: Method not implemented.");
  }
  deactivate(id: string): boolean {
    throw new Error("deactivate: Method not implemented.");
  }
  getHomes(): string[] {
    throw new Error("getHomes: Method not implemented.");
  }
}
