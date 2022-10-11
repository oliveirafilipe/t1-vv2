import Delivery from "../../domain/models/Delivery";
import { IDeliveryRepository } from "../../domain/repositories/IDeliveryRepository";

export class StubDeliveryRepository implements IDeliveryRepository {
  getAllCollected(): Delivery[] {
    throw new Error("Method not implemented.");
  }
  getByOperator(operatorId: string): Delivery[] {
    throw new Error("Method not implemented.");
  }
  getAll(): Delivery[] {
    throw new Error("getAll: Method not implemented.");
  }
  getAllNotCollected(): Delivery[] {
    throw new Error("getAllNotCollected: Method not implemented.");
  }
  getById(id: string): Delivery {
    throw new Error("getById: Method not implemented.");
  }
  save(delivery: Delivery): Delivery {
    throw new Error("save: Method not implemented.");
  }
  update(delivery: Delivery): Delivery {
    throw new Error("update: Method not implemented.");
  }
  filterByDescription(query: string): Delivery[] {
    throw new Error("filterByDescription: Method not implemented.");
  }
}
