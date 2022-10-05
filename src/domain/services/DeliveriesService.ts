import Delivery from "../models/Delivery";
import { IDeveliveryRepository } from "../repositories/IDeliveryRepository";

export class DeliveriesService {
  public deliveryRepo: IDeveliveryRepository;

  constructor(deliveryRepo: IDeveliveryRepository) {
    this.deliveryRepo = deliveryRepo;
  }

  public save(delivery: Delivery): Delivery {
    return this.deliveryRepo.save(delivery);
  }

  public getAll(): Delivery[] {
    return this.deliveryRepo.getAll();
  }
}
