import Delivery from "../../domain/models/Delivery";
import { IDeliveryRepository } from "../../domain/repositories/IDeliveryRepository";
import { generateRandomId } from "../../helpers/helpers";
import database, { DELIVERIES_COL } from "../database";

export class DeliveryRepository implements IDeliveryRepository {
  public getAll(): Delivery[] {
    return database.getCollection(DELIVERIES_COL).find() as Delivery[];
  }

  public getById(id: string): Delivery {
    return database.getCollection(DELIVERIES_COL).findOne({ id }) as Delivery;
  }

  public getByOperator(operatorId: string): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ operatorId }) as Delivery[];
  }

  public save(delivery: Delivery): Delivery {
    delivery.id = generateRandomId();
    return database.getCollection(DELIVERIES_COL).insert(delivery) as Delivery;
  }

  public filterByDescription(query: string): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ description: { $regex: [query, "i"] } });
  }

  public getAllNotCollected(): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ alreadyCollected: false }) as Delivery[];
  }

  public getLastXDays(days: number): Delivery[] {
    const today = new Date();
    const lastXDays: Delivery[] = [];
    this.getAll().forEach((delivery) => {
      const deliveryDate = new Date(delivery.date);
      const daysDifference = Math.floor(
        (deliveryDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );
      if (daysDifference <= days) {
        lastXDays.push(delivery);
      }
    });
    return lastXDays;
  }

  public getAllCollected(): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ alreadyCollected: true }) as Delivery[];
  }

  public update(delivery: Delivery): Delivery {
    return database.getCollection(DELIVERIES_COL).update(delivery);
  }
}
