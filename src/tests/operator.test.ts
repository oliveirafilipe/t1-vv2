import { DeliveriesService } from "../domain/services/DeliveriesService";
import { OperatorService } from "../domain/services/OperatorService";
import { WithdrawnService } from "../domain/services/WithdrawnService";
import { StubDeliveryRepository } from "./stubs/DeliveryRepository.stub";
import { StubOperatorRepository } from "./stubs/OperatorRepository.stub";
import { StubWithdrawRepository } from "./stubs/WithdrawRepository.stub";

describe("Operator Tests", () => {
  test("should not allow delete operator that has relationships", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const withdrawService = new WithdrawnService(
      new StubWithdrawRepository(),
      deliveryService
    );

    deliveryService.getByOperator = () => new Array(1);
    withdrawService.getByOperator = () => new Array(1);

    const operatorService = new OperatorService(
      new StubOperatorRepository(),
      deliveryService,
      withdrawService
    );

    expect(() =>
      operatorService.delete({ initials: "FOO", name: "foo", id: "123" })
    ).toThrow("Nao é possível deletar, operador possui associações");
  });
});
