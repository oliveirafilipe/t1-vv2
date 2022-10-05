import Resident from "../models/Resident";
import { IResidentRepository } from "../repositories/IResidentRepository";

export class ResidentService {
  public residentRepo: IResidentRepository;

  constructor(residentRepo: IResidentRepository) {
    this.residentRepo = residentRepo;
  }

  public save(delivery: Resident): Resident {
    return this.residentRepo.save(delivery);
  }

  public getAll(): Resident[] {
    return this.residentRepo.getAll();
  }
}
