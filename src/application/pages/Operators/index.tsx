import { Button, FormControl, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Operator from "../../../domain/models/Operator";
import { DeliveriesService } from "../../../domain/services/DeliveriesService";
import { OperatorService } from "../../../domain/services/OperatorService";
import { WithdrawnService } from "../../../domain/services/WithdrawnService";
import { DeliveryRepository } from "../../../external/repositories/DeliveryRepository";
import { OperatorRepository } from "../../../external/repositories/OperatorRepository";
import { WithdrawnRepository } from "../../../external/repositories/WithdrawnRepository";

export default function Operators() {
  const [name, setName] = useState("");
  const [initials, setInitials] = useState("");
  const [operators, setOperators] = useState<Operator[]>([]);
  const deliveryService = new DeliveriesService(new DeliveryRepository());
  const operatorService = new OperatorService(
    new OperatorRepository(),
    deliveryService,
    new WithdrawnService(new WithdrawnRepository(), deliveryService)
  );
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

  const handleDeleteOperator = (operator: Operator) => {
    try {
      operatorService.delete(operator);
      setOperators(operatorService.getAll());
    } catch (e) {
      alert(e);
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
          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            onClick={handleCreateOperator}
          >
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
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteOperator(operator);
              }}
            >
              Deletar
            </Button>
          </Paper>
        ))}
      </div>
    </>
  );
}
