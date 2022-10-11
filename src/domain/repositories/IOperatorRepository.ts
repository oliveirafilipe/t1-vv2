import Operator from "../models/Operator";

export interface IOperatorRepository {
  getAll(): Operator[];
  getOne(id: string): Operator | undefined;
  save(operator: Operator): Operator;
  delete(operator: Operator): Operator;
}
