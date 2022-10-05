import Resident from "../../domain/models/Resident";
import { IResidentRepository } from "../../domain/repositories/IResidentRepository";
import database, { RESIDENTS_COL } from "../database";

export class ResidentRepository implements IResidentRepository {
  public getAll(): Resident[] {
    return database.getCollection(RESIDENTS_COL).find() as Resident[];
  }
  public save(resident: Resident): Resident {
    return database.getCollection(RESIDENTS_COL).insert(resident) as Resident;
  }
}
