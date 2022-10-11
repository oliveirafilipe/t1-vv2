import Withdrawn from "../../domain/models/Withdrawn";
import { IWithdrawnRepository } from "../../domain/repositories/IWithdrawnRepository";

export class StubWithdrawRepository implements IWithdrawnRepository {
  getAll(): Withdrawn[] {
    throw new Error("getAll: Method not implemented.");
  }
  save(withdrawn: Withdrawn): Withdrawn {
    throw new Error("save: Method not implemented.");
  }
}
