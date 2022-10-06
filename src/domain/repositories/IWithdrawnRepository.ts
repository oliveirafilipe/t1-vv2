import Withdrawn from "../models/Withdrawn";

export interface IWithdrawnRepository {
  getAll(): Withdrawn[];
  save(withdrawn: Withdrawn): Withdrawn;
}
