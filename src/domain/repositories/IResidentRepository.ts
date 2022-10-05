import Resident from "../models/Resident";

export interface IResidentRepository {
  getAll(): Resident[];
  save(resident: Resident): Resident;
}
