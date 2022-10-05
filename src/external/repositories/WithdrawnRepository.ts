import Withdrawn from "../../domain/models/Withdrawn";
import { IWithdrawnRepository } from "../../domain/repositories/IWithdrawnRepository";
import database, { WITHDRAWALS_COL } from "../database";

export class WithdrawnRepository implements IWithdrawnRepository {
  public getAll(): Withdrawn[] {
    return database.getCollection(WITHDRAWALS_COL).find() as Withdrawn[];
  }
  public save(withdrawn: Withdrawn): Withdrawn {
    return database
      .getCollection(WITHDRAWALS_COL)
      .insert(withdrawn) as Withdrawn;
  }
}
