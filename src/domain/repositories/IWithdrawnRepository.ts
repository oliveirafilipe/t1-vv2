import Withdrawn from "../models/Withdrawn";

export interface IWithdrawnRepository {
  getAll(): Withdrawn[];
  getLastXDays(days: number): Withdrawn[];
  getByDeliveryId(deliveryId: string): Withdrawn | undefined;
  getByOperator(operatorId: string): Withdrawn[];
  save(withdrawn: Withdrawn): Withdrawn;
}
