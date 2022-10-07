import Resident from "../models/Resident";

export interface IResidentRepository {
  getAll(): Resident[];
  getHouseResidents(houseNumber: string): Resident[];
  getOne(id: string): Resident | undefined;
  save(resident: Resident): Resident;
  toggleActive(id: string): boolean;
  getHomes(): string[];
}
