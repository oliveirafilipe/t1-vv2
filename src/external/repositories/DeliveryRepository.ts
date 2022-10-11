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

  public getAllCollected(): Delivery[] {
    return database
      .getCollection(DELIVERIES_COL)
      .find({ alreadyCollected: true }) as Delivery[];
  }

  public update(delivery: Delivery): Delivery {
    return database.getCollection(DELIVERIES_COL).update(delivery);
  }
}
