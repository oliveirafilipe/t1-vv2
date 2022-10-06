import Operator from "../models/Operator";

export interface IOperatorRepository {
  getAll(): Operator[];
  save(operator: Operator): Operator;
}
