import Operator from "../models/Operator";
import { IOperatorRepository } from "../repositories/IOperatorRepository";
import { DeliveriesService } from "./DeliveriesService";
import { WithdrawnService } from "./WithdrawnService";

export class OperatorService {
  public operatorRepo: IOperatorRepository;
  public deliveryService: DeliveriesService | undefined;
  public withdrawService: WithdrawnService | undefined;

  constructor(
    userRepo: IOperatorRepository,
    deliveryService?: DeliveriesService,
    withdrawService?: WithdrawnService
  ) {
    this.operatorRepo = userRepo;
    this.deliveryService = deliveryService;
    this.withdrawService = withdrawService;
  }

  public save(operator: Operator): Operator {
    return this.operatorRepo.save(operator);
  }

  public getAll(): Operator[] {
    return this.operatorRepo.getAll();
  }

  public getOne(id: string): Operator | undefined {
    return this.operatorRepo.getOne(id);
  }

  public delete(operator: Operator) {
    if (!this.deliveryService || !this.withdrawService) {
      throw new Error("Missing dependencies");
    }
    const deliveries = this.deliveryService.getByOperator(operator.id || "");
    const withdraws = this.withdrawService.getByOperator(operator.id || "");

    if (deliveries.length !== 0 || withdraws.length !== 0) {
      throw new Error("Nao é possível deletar, operador possui associações");
    }

    return this.operatorRepo.delete(operator);
  }
}
