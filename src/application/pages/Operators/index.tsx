import { Button, FormControl, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Operator from "../../../domain/models/Operator";
import { OperatorService } from "../../../domain/services/OperatorService";
import { OperatorRepository } from "../../../external/repositories/OperatorRepository";

export default function Operators() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const operatorService = new OperatorService(new OperatorRepository());
  const [operators, setOperators] = useState<Operator[]>([]);
  useEffect(() => {
    setOperators(operatorService.getAll());
  }, []);
  const handleCreateOperator = () => {
    const operator: Operator = {
      name,
      initials,
    };
    const createdOperator = operatorService.save(operator);
    if (createdOperator) {
      setName("");
      setInitials("");
      setOperators(operatorService.getAll());
    } else {
      alert("Error creating operator.");
    }
  };
  return (
    <>
      <div className="container">
        <h1>Cadastrar Operador</h1>
        <FormControl style={{ width: "100%" }}>
          <TextField
            style={{ marginBottom: "1rem" }}
            label="Nome"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Iniciais"
            variant="filled"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          ></TextField>
          <Button variant="contained" onClick={handleCreateOperator}>
            Cadastrar
          </Button>
        </FormControl>
      </div>
      <div className="container" style={{ marginTop: "2rem" }}>
        <h1>Operadores Cadastrados</h1>
        {operators.map((operator) => (
          <Paper
            key={operator.id}
            elevation={2}
            style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
          >
            <h2 style={{ margin: 0 }}>Nome: {operator.name}</h2>
            <h3 style={{ margin: "0.3rem" }}>Iniciais: {operator.initials}</h3>
          </Paper>
        ))}
      </div>
    </>
  );
}
