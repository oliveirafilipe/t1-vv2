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

  public getOne(id: string): Resident | undefined {
    return database.getCollection(RESIDENTS_COL).findOne({ id }) as Resident;
  }

  public save(resident: Resident): Resident {
    resident.id = generateRandomId();
    return database.getCollection(RESIDENTS_COL).insert(resident) as Resident;
  }

  public toggleActive(id: string): boolean {
    const resident = this.getOne(id);
    if (resident) {
      resident.active = !resident.active;
      database.getCollection(RESIDENTS_COL).update(resident);
      return true;
    }
    return false;
  }

  public getHomes(): string[] {
    const houseNumbers: string[] = [];
    this.getAll().forEach((resident) => {
      if (!houseNumbers.includes(resident.houseNumber))
        houseNumbers.push(resident.houseNumber);
    });
    return houseNumbers;
  }
}
