import Operator from "../models/Operator";
import { IOperatorRepository } from "../repositories/IOperatorRepository";

export class OperatorService {
  operatorRepo: IOperatorRepository;

  constructor(userRepo: IOperatorRepository) {
    this.operatorRepo = userRepo;
  }

  save(operator: Operator) {
    return this.operatorRepo.save(operator);
  }

  getAll() {
    return this.operatorRepo.getAll();
  }
}
