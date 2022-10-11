import Resident from "../../domain/models/Resident";
import { IResidentRepository } from "../../domain/repositories/IResidentRepository";
import { generateRandomId } from "../../helpers/helpers";
import database, { RESIDENTS_COL } from "../database";

export class ResidentRepository implements IResidentRepository {
  public getAll(): Resident[] {
    return database.getCollection(RESIDENTS_COL).find() as Resident[];
  }

  public getHouseResidents(houseNumber: string): Resident[] {
    return database
      .getCollection(RESIDENTS_COL)
      .find({ houseNumber, active: true }) as Resident[];
  }

  public getById(id: string): Resident | null {
    return database.getCollection(RESIDENTS_COL).findOne({ id }) as Resident;
  }

  public save(resident: Resident): Resident {
    resident.id = generateRandomId();
    return database.getCollection(RESIDENTS_COL).insert(resident) as Resident;
  }

  public deactivate(id: string): boolean {
    const resident = this.getById(id);
    if (resident) {
      resident.active = false;
      database.getCollection(RESIDENTS_COL).update(resident);
      return true;
    }
    return false;
  }

  public getHomes(): string[] {
    const houseNumbers: string[] = [];
    this.getAll().forEach((resident) => {
      if (resident.active && !houseNumbers.includes(resident.houseNumber))
        houseNumbers.push(resident.houseNumber);
    });
    return houseNumbers;
  }

  public getByRg(rg: string): Resident | null {
    return database.getCollection(RESIDENTS_COL).findOne({ rg });
  }
}
