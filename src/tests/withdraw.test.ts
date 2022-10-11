import { expect, jest, test } from "@jest/globals";
import Withdrawn from "../domain/models/Withdrawn";
import { DeliveriesService } from "../domain/services/DeliveriesService";
import { ResidentService } from "../domain/services/ResidentService";
import { WithdrawnService } from "../domain/services/WithdrawnService";
import { StubDeliveryRepository } from "./stubs/DeliveryRepository.stub";
import { StubResidentRepository } from "./stubs/ResidentRepository.stub";
import { StubWithdrawRepository } from "./stubs/WithdrawRepository.stub";

describe("Withdraw Test", () => {
  test("should throw error for withdraw date earlier than delivery", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const withdrawService = new WithdrawnService(
      new StubWithdrawRepository(),
      deliveryService,
      new ResidentService(new StubResidentRepository())
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

  test("Should throw error when trying to associate withdraw with a inactive user", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const residentService = new ResidentService(new StubResidentRepository());
    const withdrawService = new WithdrawnService(
      new StubWithdrawRepository(),
      deliveryService,
      residentService
    );

    residentService.getById = () => ({
      active: false,
      houseNumber: "1",
      name: "Foo",
      rg: "123",
    });

    deliveryService.getById = () => ({
      alreadyCollected: false,
      date: "2022-10-11T03:11:51.217Z",
      description: "Foo",
      houseNumber: "1",
      operatorId: "bar",
    });

    const withdraw: Withdrawn = {
      date: new Date("2022-10-12T03:11:51.217Z"),
      deliveryId: "foo",
      operatorId: "bar",
      residentId: "zedd",
    };

    expect(() => withdrawService.save(withdraw)).toThrow(
      "Residente está inativo, não poderá ser associado a retirada"
    );
  });
  test("Should throw error for invalid resident id", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const residentService = new ResidentService(new StubResidentRepository());
    const withdrawService = new WithdrawnService(
      new StubWithdrawRepository(),
      deliveryService,
      residentService
    );

    residentService.getById = () => null;

    deliveryService.getById = () => ({
      alreadyCollected: false,
      date: "2022-10-11T03:11:51.217Z",
      description: "Foo",
      houseNumber: "1",
      operatorId: "bar",
    });

    const withdraw: Withdrawn = {
      date: new Date("2022-10-12T03:11:51.217Z"),
      deliveryId: "foo",
      operatorId: "bar",
      residentId: "zedd",
    };

    expect(() => withdrawService.save(withdraw)).toThrow(
      "Residente vinculado à retirada não encontrado"
    );
  });

  test("should set delivery as collected", () => {
    const deliveryService = new DeliveriesService(new StubDeliveryRepository());
    const residentService = new ResidentService(new StubResidentRepository());
    const withdrawRepository = new StubWithdrawRepository();
    const withdrawService = new WithdrawnService(
      withdrawRepository,
      deliveryService,
      residentService
    );

    residentService.getById = () => ({
      active: true,
      houseNumber: "1",
      name: "Foo",
      rg: "123",
    });

    deliveryService.getById = () => ({
      alreadyCollected: false,
      date: "2022-10-11T03:11:51.217Z",
      description: "Foo",
      houseNumber: "1",
      operatorId: "bar",
    });

    const mockSetAsCollected =
      jest.fn<typeof deliveryService.setCollectedById>();

    mockSetAsCollected.mockImplementation(() => {});

    deliveryService.setCollectedById = mockSetAsCollected;

    const withdraw: Withdrawn = {
      date: new Date("2022-10-12T03:11:51.217Z"),
      deliveryId: "foo",
      operatorId: "bar",
      residentId: "zedd",
    };

    withdrawRepository.save = () => ({ ...withdraw, id: "123" });

    withdrawService.save(withdraw);

    expect(mockSetAsCollected).toBeCalledWith("foo");
  });
});

export {};
