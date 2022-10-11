import Withdrawn from "../domain/models/Withdrawn";
import { DeliveriesService } from "../domain/services/DeliveriesService";
import { WithdrawalsService } from "../domain/services/WithdrawalsService";
import { DeliverRepository } from "../external/repositories/DeliveryRepository";
import { StubWithdrawRepository } from "./stubs/WithdrawRepository.stub";

describe("Withdraw Test", () => {
  test("should throw error for withdraw date earlier than delivery", () => {
    const deliveryService = new DeliveriesService(new DeliverRepository());
    const withdrawService = new WithdrawalsService(
      new StubWithdrawRepository(),
      deliveryService
    );

    deliveryService.getById = () => ({
      alreadyCollected: false,
      date: "2022-10-11T03:11:51.217Z",
      description: "Foo",
      houseNumber: "1",
      operatorId: "bar",
    });

    const withdraw: Withdrawn = {
      date: new Date("2022-10-11T03:11:51.217Z"),
      deliveryId: "foo",
      operatorId: "bar",
      residentId: "zedd",
    };

    expect(() => withdrawService.save(withdraw)).toThrow(
      "Data da retirada não pode ser menor ou igual a data da entrega"
    );
  });
});

export {};
