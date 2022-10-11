import Withdrawn from "../models/Withdrawn";

export interface IWithdrawnRepository {
  getAll(): Withdrawn[];
  getLastXDays(days: number): Withdrawn[];
  getByDeliveryId(deliveryId: string): Withdrawn | undefined;
  save(withdrawn: Withdrawn): Withdrawn;
}
