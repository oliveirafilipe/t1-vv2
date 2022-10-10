import Withdrawn from "../models/Withdrawn";
import { IWithdrawnRepository } from "../repositories/IWithdrawnRepository";

export class WithdrawalsService {
  public withdrawnlRepo: IWithdrawnRepository;

  constructor(withdrawnlRepo: IWithdrawnRepository) {
    this.withdrawnlRepo = withdrawnlRepo;
  }

  public save(withdrawn: Withdrawn): Withdrawn {
    return this.withdrawnlRepo.save(withdrawn);
  }

  public getAll(): Withdrawn[] {
    return this.withdrawnlRepo.getAll();
  }

}
