import Delivery from "../models/Delivery";
import { IDeliveryRepository } from "../repositories/IDeliveryRepository";

export class DeliveriesService {
  public deliveryRepo: IDeliveryRepository;

  constructor(deliveryRepo: IDeliveryRepository) {
    this.deliveryRepo = deliveryRepo;
  }

  public save(delivery: Delivery): Delivery {
    return this.deliveryRepo.save(delivery);
  }

  public update(delivery: Delivery): Delivery {
    return this.deliveryRepo.update(delivery);
  }

  public setCollectedById(id: string) {
    const delivery = this.getById(id);
    delivery.alreadyCollected = true;
    this.update(delivery);
  }

  public getAll(): Delivery[] {
    return this.deliveryRepo.getAll();
  }

  public getAllNotCollected(): Delivery[] {
    return this.deliveryRepo.getAllNotCollected();
  }

  public getAllCollected(): Delivery[] {
    return this.deliveryRepo.getAllCollected();
  }

  public getLastXDays(days: number): Delivery[] {
    return this.deliveryRepo.getLastXDays(days);
  }

  public getById(id: string) {
    return this.deliveryRepo.getById(id);
  }

  public filterByDescription(query: string): Delivery[] {
    return this.deliveryRepo.filterByDescription(query);
  }

  public getByOperator(operatorId: string): Delivery[] {
    return this.deliveryRepo.getByOperator(operatorId);
  }
}
