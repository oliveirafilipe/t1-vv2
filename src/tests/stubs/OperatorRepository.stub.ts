import Operator from "../../domain/models/Operator";
import { IOperatorRepository } from "../../domain/repositories/IOperatorRepository";

export class StubOperatorRepository implements IOperatorRepository {
  getAll(): Operator[] {
    throw new Error("Method not implemented.");
  }
  getOne(id: string): Operator | undefined {
    throw new Error("Method not implemented.");
  }
  save(operator: Operator): Operator {
    throw new Error("Method not implemented.");
  }
  delete(operator: Operator): Operator {
    throw new Error("Method not implemented.");
  }
}
