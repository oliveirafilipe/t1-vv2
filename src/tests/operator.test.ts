import { DeliveriesService } from "../domain/services/DeliveriesService";
import { OperatorService } from "../domain/services/OperatorService";
import { WithdrawnService } from "../domain/services/WithdrawnService";
import { OperatorRepository } from "../external/repositories/OperatorRepository";
import { WithdrawnRepository } from "../external/repositories/WithdrawnRepository";
import { StubDeliveryRepository } from "./stubs/DeliveryRepository.stub";

describe("Operator Tests", () => {
  test("should not allow delete operator that has relationships", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const withdrawService = new WithdrawnService(
      new WithdrawnRepository(),
      deliveryService
    );

    deliveryService.getByOperator = () => new Array(1);
    withdrawService.getByOperator = () => new Array(1);

    const operatorService = new OperatorService(
      new OperatorRepository(),
      deliveryService,
      withdrawService
    );

    expect(() =>
      operatorService.delete({ initials: "FOO", name: "foo", id: "123" })
    ).toThrow("Nao é possível deletar, operador possui associações");
  });
});
