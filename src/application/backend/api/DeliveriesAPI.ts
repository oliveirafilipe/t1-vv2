import database, { DELIVERIES_COL } from "../database/database";
import Delivery from "../models/Delivery";

export default class DeliveriesAPI {
  public static getAll(): Delivery[] {
    return database.getCollection(DELIVERIES_COL).find() as Delivery[];
  }
  public static create(delivery: Delivery): Delivery | null {
    return database.getCollection(DELIVERIES_COL).insert(delivery) as Delivery;
  }
}
