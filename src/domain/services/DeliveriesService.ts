import Delivery from "../models/Delivery";
import { IDeveliveryRepository } from "../repositories/IDeliveryRepository";

export class DeliveriesService {
  deliveryRepo: IDeveliveryRepository;

  constructor(deliveryRepo: IDeveliveryRepository) {
    this.deliveryRepo = deliveryRepo;
  }

  save(delivery: Delivery) {
    return this.deliveryRepo.save(delivery);
  }

  getAll() {
    return this.deliveryRepo.getAll();
  }
}
