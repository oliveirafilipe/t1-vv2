import Resident from "../models/Resident";
import { IResidentRepository } from "../repositories/IResidentRepository";

export class ResidentService {
  residentRepo: IResidentRepository;

  constructor(residentRepo: IResidentRepository) {
    this.residentRepo = residentRepo;
  }

  save(delivery: Resident) {
    return this.residentRepo.save(delivery);
  }

  getAll() {
    return this.residentRepo.getAll();
  }
}
