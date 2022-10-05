import Delivery from "../../domain/models/Delivery";
import { IDeveliveryRepository } from "../../domain/repositories/IDeliveryRepository";
import database, { DELIVERIES_COL } from "../database";

export class DeliverRepository implements IDeveliveryRepository {
  public getAll(): Delivery[] {
    return database.getCollection(DELIVERIES_COL).find() as Delivery[];
  }
  public save(delivery: Delivery): Delivery {
    return database.getCollection(DELIVERIES_COL).insert(delivery) as Delivery;
  }
}
