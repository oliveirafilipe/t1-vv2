import Operator from "../models/Operator";
import { IOperatorRepository } from "../repositories/IOperatorRepository";

export class OperatorService {
  public operatorRepo: IOperatorRepository;

  constructor(userRepo: IOperatorRepository) {
    this.operatorRepo = userRepo;
  }

  public save(operator: Operator): Operator {
    return this.operatorRepo.save(operator);
  }

  public getAll(): Operator[] {
    return this.operatorRepo.getAll();
  }
}
