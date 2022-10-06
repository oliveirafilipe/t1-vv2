import { Button, FormControl, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Resident from "../../../domain/models/Resident";
import { ResidentService } from "../../../domain/services/ResidentService";
import { ResidentRepository } from "../../../external/repositories/ResidentRepository";

export default function Residents() {
  const [name, setName] = useState("");
  const [rg, setRG] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const residentService = new ResidentService(new ResidentRepository());
  const [residents, setResidents] = useState<Resident[]>([]);
  useEffect(() => {
    setResidents(residentService.getAll());
  }, []);
  const handleCreateResident = () => {
    const resident: Resident = {
      name,
      rg,
      houseNumber,
      active: true,
    };
    try {
      residentService.save(resident);
      setName("");
      setRG("");
      setHouseNumber("");
      setResidents(residentService.getAll());
    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleToggleActive = (id: string | undefined) => {
    if (!id) {
      return;
    }
    const updated = residentService.toggleActive(id);
    if (updated) {
      setResidents(residentService.getAll());
    } else {
      alert("Essa ação não pode ser realizada.");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Cadastrar Morador</h1>
        <FormControl style={{ width: "100%" }}>
          <TextField
            style={{ marginBottom: "1rem" }}
            label="Nome"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            style={{ marginBottom: "1rem" }}
            label="RG"
            variant="filled"
            value={rg}
            onChange={(e) => setRG(e.target.value)}
          ></TextField>
          <TextField
            label="Número da Casa"
            variant="filled"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          ></TextField>
          <Button variant="contained" onClick={handleCreateResident}>
            Cadastrar
          </Button>
        </FormControl>
      </div>
      <div className="container" style={{ marginTop: "2rem" }}>
        <h1>Moradores Cadastrados</h1>
        {residents.map((resident) => (
          <Paper
            key={resident.id}
            elevation={2}
            style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
          >
            <h2 style={{ margin: 0 }}>Nome: {resident.name}</h2>
            <h3 style={{ margin: "0.3rem" }}>RG: {resident.rg}</h3>
            <h3 style={{ margin: "0.3rem" }}>
              Número da Casa: {resident.houseNumber}
            </h3>
            <Button
              variant="contained"
              color={resident.active ? "error" : "info"}
              onClick={() => {
                handleToggleActive(resident.id);
              }}
            >
              {resident.active ? "Inativar" : "Ativar"}
            </Button>
          </Paper>
        ))}
      </div>
    </>
  );
}
