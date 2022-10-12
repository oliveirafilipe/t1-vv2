import Withdrawn from "../../domain/models/Withdrawn";
import { IWithdrawnRepository } from "../../domain/repositories/IWithdrawnRepository";
import { generateRandomId } from "../../helpers/helpers";
import database, { WITHDRAWALS_COL } from "../database";

export class WithdrawnRepository implements IWithdrawnRepository {
  public getAll(): Withdrawn[] {
    return database
      .getCollection(WITHDRAWALS_COL)
      .find()
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ) as Withdrawn[];
  }

  public getByDeliveryId(deliveryId: string): Withdrawn | undefined {
    return database
      .getCollection(WITHDRAWALS_COL)
      .findOne({ deliveryId }) as Withdrawn;
  }

  public save(withdrawn: Withdrawn): Withdrawn {
    withdrawn.id = generateRandomId();
    return database
      .getCollection(WITHDRAWALS_COL)
      .insert(withdrawn) as Withdrawn;
  }

  public getByOperator(operatorId: string): Withdrawn[] {
    return database
      .getCollection(WITHDRAWALS_COL)
      .find({ operatorId }) as Withdrawn[];
  }
}
