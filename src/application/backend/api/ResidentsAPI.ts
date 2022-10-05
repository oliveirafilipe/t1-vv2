import database, { RESIDENTS_COL } from "../database/database";
import Resident from "../models/Resident";

export default class ResidentsAPI {
  public static getAll(): Resident[] {
    return database.getCollection(RESIDENTS_COL).find() as Resident[];
  }
  public static create(resident: Resident): Resident | null {
    return database.getCollection(RESIDENTS_COL).insert(resident) as Resident;
  }
}
