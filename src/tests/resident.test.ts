import { expect, jest, test } from "@jest/globals";
import { ResidentService } from "../domain/services/ResidentService";
import { StubResidentRepository } from "./stubs/ResidentRepository.stub";

describe("Resident Tests", () => {
  test("should reject new resident after 8 living in a house", () => {
    const stubRepository = new StubResidentRepository();
    stubRepository.getHouseResidents = () => new Array(8);
    const residentService = new ResidentService(stubRepository);

    const resident = {
      active: true,
      houseNumber: "1",
      name: "Foo",
      rg: "1234",
    };

    expect(() => residentService.save(resident)).toThrow(
      "Limite de moradores ativos atingido."
    );
  });

  test("should reject duplicated RG", () => {
    const stubRepository = new StubResidentRepository();

    const resident = {
      active: true,
      houseNumber: "1",
      name: "Foo",
      rg: "1234",
    };

    stubRepository.getHouseResidents = jest.fn(() => new Array(1));
    stubRepository.getByRg = jest.fn(() => resident);
    const residentService = new ResidentService(stubRepository);

    expect(() => residentService.save(resident)).toThrow("RG já utilizado.");
  });

  test("should try to save new resident", () => {
    const stubRepository = new StubResidentRepository();

    const resident = {
      active: true,
      houseNumber: "1",
      name: "Foo",
      rg: "1234",
    };

    const mockSave = jest.fn<typeof stubRepository.save>();

    mockSave.mockImplementation(() => ({ ...resident, id: "123" }));

    stubRepository.getHouseResidents = jest.fn(() => new Array(1));
    stubRepository.getByRg = jest.fn(() => null);
    stubRepository.save = mockSave;
    const residentService = new ResidentService(stubRepository);

    const savedResident = residentService.save(resident);

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(mockSave).toBeCalledWith(resident);
    expect(savedResident.id).toBe("123");
  });
});

export {};
