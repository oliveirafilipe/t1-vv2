import database, { OPERATORS_COL } from "../database/database";
import Operator from "../models/Operator";

export default class OperatorsAPI {
  public static getAll(): Operator[] {
    return database.getCollection(OPERATORS_COL).find() as Operator[];
  }
  public static create(operator: Operator): Operator | null {
    return database.getCollection(OPERATORS_COL).insert(operator) as Operator;
  }
}
