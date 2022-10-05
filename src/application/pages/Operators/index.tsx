import { Button, FormControl, Paper, TextField } from "@mui/material";
import { useState } from "react";
import OperatorsAPI from "../../backend/api/OperatorsAPI";
import Operator from "../../backend/models/Operator";

export default function Operators() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [operators, setOperators] = useState(OperatorsAPI.getAll());
  const handleCreateOperator = () => {
    const operator: Operator = {
      name,
      initials,
    };
    const createdOperator = OperatorsAPI.create(operator);
    if (createdOperator) {
      setName("");
      setInitials("");
      setOperators(OperatorsAPI.getAll());
    } else {
      alert("Error creating operator.");
    }
  };
  return (
    <>
      <h1>Cadastrar Operador</h1>
      <FormControl>
        <TextField
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
      <h1>Operadores Cadastrados</h1>
      {operators.map((operator) => (
        <Paper
          key={operator.id}
          elevation={2}
          style={{ padding: "1rem", margin: "1rem" }}
        >
          <h2 style={{ margin: 0 }}>Nome: {operator.name}</h2>
          <h3 style={{ margin: "0.3rem" }}>Iniciais: {operator.initials}</h3>
        </Paper>
      ))}
    </>
  );
}
