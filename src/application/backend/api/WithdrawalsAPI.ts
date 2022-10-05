import database, { WITHDRAWALS_COL } from "../database/database";
import Withdrawn from "../models/Withdrawn";

export default class WithdrawalsAPI {
  public static getAll(): Withdrawn[] {
    return database.getCollection(WITHDRAWALS_COL).find() as Withdrawn[];
  }
  public static create(withdrawn: Withdrawn): Withdrawn | null {
    return database
      .getCollection(WITHDRAWALS_COL)
      .insert(withdrawn) as Withdrawn;
  }
}
