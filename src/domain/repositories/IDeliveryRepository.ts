import Delivery from "../models/Delivery";

export interface IDeliveryRepository {
  getAll(): Delivery[];
  getAllNotCollected(): Delivery[];
  getAllCollected(): Delivery[];
  getById(id: string): Delivery;
  save(delivery: Delivery): Delivery;
  update(delivery: Delivery): Delivery;
  filterByDescription(query: string): Delivery[];
}
