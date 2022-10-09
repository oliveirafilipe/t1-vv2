import Delivery from "../models/Delivery";

export interface IDeveliveryRepository {
  getAll(): Delivery[];
  save(delivery: Delivery): Delivery;
  filterByDescription(query: string): Delivery[];
}
