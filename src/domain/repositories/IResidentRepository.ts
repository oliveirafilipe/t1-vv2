import Resident from "../models/Resident";

export interface IResidentRepository {
  getAll(): Resident[];
  getOne(id: string): Resident | undefined;
  save(resident: Resident): Resident;
  toggleActive(id: string): boolean;
}
