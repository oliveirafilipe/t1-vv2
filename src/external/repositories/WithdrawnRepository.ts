import Withdrawn from "../../domain/models/Withdrawn";
import { IWithdrawnRepository } from "../../domain/repositories/IWithdrawnRepository";
import { generateRandomId } from "../../helpers/helpers";
import database, { WITHDRAWALS_COL } from "../database";

export class WithdrawnRepository implements IWithdrawnRepository {
  public getAll(): Withdrawn[] {
    return database.getCollection(WITHDRAWALS_COL).find() as Withdrawn[];
  }

  public getLastXDays(days: number): Withdrawn[] {
    const today = new Date();
    const lastXDays: Withdrawn[] = [];
    this.getAll().forEach((withdrawn) => {
      const withdrawnDate = new Date(withdrawn.date);
      const daysDifference = Math.floor(
        (withdrawnDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      if (daysDifference <= days) {
        lastXDays.push(withdrawn);
      }
    });
    return lastXDays;
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
}
