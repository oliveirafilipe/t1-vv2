import Withdrawn from "../models/Withdrawn";
import { IWithdrawnRepository } from "../repositories/IWithdrawnRepository";
import { DeliveriesService } from "./DeliveriesService";

export class WithdrawnService {
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
    const delivery = this.deliveryService.getById(withdrawn.deliveryId);
    if (new Date(delivery.date) >= withdrawn.date) {
      throw new Error(
        "Data da retirada não pode ser menor que a data da entrega"
      );
    }
    this.deliveryService.setCollectedById(withdrawn.deliveryId);
    return this.withdrawnRepo.save(withdrawn);
  }

  public getAll(): Withdrawn[] {
    return this.withdrawnRepo.getAll();
  }

  public getByDeliveryId(deliveryId: string): Withdrawn | undefined {
    return this.withdrawnRepo.getByDeliveryId(deliveryId);
  }

  public getLastXDays(days: number): Withdrawn[] {
    return this.withdrawnRepo.getLastXDays(days);
  }
}
