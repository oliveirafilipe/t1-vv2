import Withdrawn from "../models/Withdrawn";
import { IWithdrawnRepository } from "../repositories/IWithdrawnRepository";
import { DeliveriesService } from "./DeliveriesService";

export class WithdrawalsService {
  public withdrawnRepo: IWithdrawnRepository;
  public deliveryService: DeliveriesService;

  constructor(
    withdrawnRepo: IWithdrawnRepository,
    deliveryService: DeliveriesService
  ) {
    this.withdrawnRepo = withdrawnRepo;
    this.deliveryService = deliveryService;
  }

  public save(withdrawn: Withdrawn): Withdrawn {
    this.deliveryService.setCollectedById(withdrawn.deliveryId);
    return this.withdrawnRepo.save(withdrawn);
  }

  public getAll(): Withdrawn[] {
    return this.withdrawnRepo.getAll();
  }
}
