import Resident from "../models/Resident";
import { IResidentRepository } from "../repositories/IResidentRepository";

export class ResidentService {
  public residentRepo: IResidentRepository;
  public static MAX_HOUSE_RESIDENTS = 2;

  constructor(residentRepo: IResidentRepository) {
    this.residentRepo = residentRepo;
  }

  public save(resident: Resident): Resident {
    const houseResidents = this.residentRepo.getHouseResidents(
      resident.houseNumber
    );
    if (houseResidents.length < ResidentService.MAX_HOUSE_RESIDENTS) {
      return this.residentRepo.save(resident);
    }
    throw new Error("Limite de residentes ativos atingido.");
  }

  public getAll(): Resident[] {
    return this.residentRepo.getAll();
  }

  public getHouseResidents(houseNumber: string): Resident[] {
    return this.residentRepo.getHouseResidents(houseNumber);
  }

  public getOne(id: string): Resident | undefined {
    return this.residentRepo.getOne(id);
  }

  public toggleActive(id: string): boolean {
    return this.residentRepo.toggleActive(id);
  }
}
