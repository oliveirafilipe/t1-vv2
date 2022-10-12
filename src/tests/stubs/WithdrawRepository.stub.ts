import Withdrawn from "../../domain/models/Withdrawn";
import { IWithdrawnRepository } from "../../domain/repositories/IWithdrawnRepository";

export class StubWithdrawRepository implements IWithdrawnRepository {
  getByDeliveryId(deliveryId: string): Withdrawn | undefined {
    throw new Error("Method not implemented.");
  }
  getByOperator(operatorId: string): Withdrawn[] {
    throw new Error("getByOperator: Method not implemented.");
  }
  getAll(): Withdrawn[] {
    throw new Error("getAll: Method not implemented.");
  }
  save(withdrawn: Withdrawn): Withdrawn {
    throw new Error("save: Method not implemented.");
  }
}
