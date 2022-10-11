import database, { OPERATORS_COL } from "../database";
import Operator from "../../domain/models/Operator";
import { IOperatorRepository } from "../../domain/repositories/IOperatorRepository";
import { generateRandomId } from "../../helpers/helpers";

export class OperatorRepository implements IOperatorRepository {
  public getAll(): Operator[] {
    return database.getCollection(OPERATORS_COL).find() as Operator[];
  }
  public getOne(id: string): Operator | undefined {
    return database.getCollection(OPERATORS_COL).findOne({ id }) as Operator;
  }
  public save(operator: Operator): Operator {
    operator.id = generateRandomId();
    return database.getCollection(OPERATORS_COL).insert(operator) as Operator;
  }
  public delete(operator: Operator): Operator {
    return database.getCollection(OPERATORS_COL).remove(operator);
  }
}
