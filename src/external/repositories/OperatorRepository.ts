import database, { OPERATORS_COL } from "../database";
import Operator from "../../domain/models/Operator";
import { IOperatorRepository } from "../../domain/repositories/IOperatorRepository";

export class OperatorRepository implements IOperatorRepository {
  getAll(): Operator[] {
    return database.getCollection(OPERATORS_COL).find() as Operator[];
  }
  save(operator: Operator) {
    return database.getCollection(OPERATORS_COL).insert(operator) as Operator;
  }
}
