import Resident from "../models/Resident";

export interface IResidentRepository {
  getAll(): Resident[];
  getHouseResidents(houseNumber: string): Resident[];
  getById(id: string): Resident | null;
  getByRg(rg: string): Resident | null;
  save(resident: Resident): Resident;
  deactivate(id: string): boolean;
  getHomes(): string[];
}
