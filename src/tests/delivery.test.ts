import { expect, jest, test } from "@jest/globals";
import { DeliveriesService } from "../domain/services/DeliveriesService";
import { StubDeliveryRepository } from "./stubs/DeliveryRepository.stub";

describe("Delivery Tests", () => {
  test("Should try to save new delivery", () => {
    const stubRepository = new StubDeliveryRepository();

    const delivery = {
      operatorId: "1",
      date: new Date().toString(),
      description: "Foo",
      houseNumber: "12",
      alreadyCollected: true,
    };

    const mockSave = jest.fn<typeof stubRepository.save>();

    mockSave.mockImplementation(() => ({ ...delivery, id: "123" }));

    stubRepository.save = mockSave;

    const deliveryService = new DeliveriesService(stubRepository);

    const savedDelivery = deliveryService.save(delivery);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toBeCalledWith(delivery);
    expect(savedDelivery.id).toBe("123");
  });

  test("should set delivery as collected", () => {
    const stubRepository = new StubDeliveryRepository();

    const delivery = {
      operatorId: "1",
      date: new Date().toString(),
      description: "Foo",
      houseNumber: "12",
      alreadyCollected: false,
    };

    const mockUpdate = jest.fn<typeof stubRepository.update>();

    mockUpdate.mockImplementation(() => ({ ...delivery, id: "123" }));

    stubRepository.update = mockUpdate;

    const deliveryService = new DeliveriesService(stubRepository);

    deliveryService.getById = () => delivery;

    deliveryService.setCollectedById("123");

    expect(mockUpdate).toBeCalledWith({ ...delivery, alreadyCollected: true });
  });
});

export {};
