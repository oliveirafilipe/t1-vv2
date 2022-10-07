import Delivery from "../../domain/models/Delivery";
import { IDeveliveryRepository } from "../../domain/repositories/IDeliveryRepository";
import { generateRandomId } from "../../helpers/helpers";
import database, { DELIVERIES_COL } from "../database";

export class DeliverRepository implements IDeveliveryRepository {
  public getAll(): Delivery[] {
    return database.getCollection(DELIVERIES_COL).find() as Delivery[];
  }
  public save(delivery: Delivery): Delivery {
    delivery.id = generateRandomId();
    return database.getCollection(DELIVERIES_COL).insert(delivery) as Delivery;
  }

  public filterByDescription(query: string): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ description: { $regex: query } });
  }
}
