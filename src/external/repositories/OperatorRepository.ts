import database, { OPERATORS_COL } from "../database";
import Operator from "../../domain/models/Operator";
import { IOperatorRepository } from "../../domain/repositories/IOperatorRepository";

export class OperatorRepository implements IOperatorRepository {
  public getAll(): Operator[] {
    return database.getCollection(OPERATORS_COL).find() as Operator[];
  }
  public save(operator: Operator): Operator {
    return database.getCollection(OPERATORS_COL).insert(operator) as Operator;
  }
}
