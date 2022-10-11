import Withdrawn from "../models/Withdrawn";
import { IWithdrawnRepository } from "../repositories/IWithdrawnRepository";
import { DeliveriesService } from "./DeliveriesService";
import { ResidentService } from "./ResidentService";

export class WithdrawnService {
  public withdrawnRepo: IWithdrawnRepository;
  public deliveryService: DeliveriesService;
  public residentService: ResidentService | undefined;

  constructor(
    withdrawnRepo: IWithdrawnRepository,
    deliveryService: DeliveriesService,
    residentService?: ResidentService
  ) {
    this.withdrawnRepo = withdrawnRepo;
    this.deliveryService = deliveryService;
    this.residentService = residentService;
  }

  public save(withdrawn: Withdrawn): Withdrawn {
    const delivery = this.deliveryService.getById(withdrawn.deliveryId);
    if (new Date(delivery.date) >= withdrawn.date) {
      throw new Error(
        "Data da retirada não pode ser menor ou igual a data da entrega"
      );
    }

    if (!this.residentService) {
      throw new Error("missing dependencies");
    }
    const resident = this.residentService.getById(withdrawn.residentId);
    if (!resident) {
      throw new Error("Residente vinculado à retirada não encontrado");
    }
    if (!resident.active) {
      throw new Error(
        "Residente está inativo, não poderá ser associado a retirada"
      );
    }
    this.deliveryService.setCollectedById(withdrawn.deliveryId);
    return this.withdrawnRepo.save(withdrawn);
  }

  public getAll(): Withdrawn[] {
    return this.withdrawnRepo.getAll();
  }

  public getByDeliveryId(deliveryId: string): Withdrawn | undefined {
    return this.withdrawnRepo.getByDeliveryId(deliveryId);
  }

  public getLastXDays(days: number): Withdrawn[] {
    return this.withdrawnRepo.getLastXDays(days);
  }

  public getByOperator(operatorId: string): Withdrawn[] {
    return this.withdrawnRepo.getByOperator(operatorId);
  }
}
