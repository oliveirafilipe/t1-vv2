import Resident from "../models/Resident";
import { IResidentRepository } from "../repositories/IResidentRepository";

export class ResidentService {
  public residentRepo: IResidentRepository;
  public static readonly MAX_HOUSE_RESIDENTS = 8;

  constructor(residentRepo: IResidentRepository) {
    this.residentRepo = residentRepo;
  }

  public save(resident: Resident): Resident {
    const houseResidents = this.residentRepo.getHouseResidents(
      resident.houseNumber
    );
    if (houseResidents.length >= ResidentService.MAX_HOUSE_RESIDENTS) {
      throw new Error("Limite de moradores ativos atingido.");
    }
    const sameRG = this.getByRG(resident.rg);
    if (sameRG !== null) {
      throw new Error("RG já utilizado.");
    }
    return this.residentRepo.save(resident);
  }

  public getAll(): Resident[] {
    return this.residentRepo.getAll();
  }

  public getHouseResidents(houseNumber: string): Resident[] {
    return this.residentRepo.getHouseResidents(houseNumber);
  }

  public getById(id: string): Resident | null {
    return this.residentRepo.getById(id);
  }

  public getByRG(rg: string): Resident | null {
    return this.residentRepo.getByRg(rg);
  }

  public deactivate(id: string): boolean {
    const resident = this.residentRepo.getById(id);
    if (!resident) {
      throw new Error("Morador não encontrado.");
    }
    return this.residentRepo.deactivate(id);
  }

  public getAllHomes(): string[] {
    return this.residentRepo.getHomes();
  }
}
