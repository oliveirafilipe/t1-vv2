import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Operator from "../../../domain/models/Operator";
import { OperatorService } from "../../../domain/services/OperatorService";
import { OperatorRepository } from "../../../external/repositories/OperatorRepository";
import UserSession from "../../session/user";

export default function User() {
  const [currentUserName, setCurrentUserName] = useState("");
  useEffect(() => {
    setCurrentUserName(UserSession.getCurrentUserName());
  }, []);
  const [operators, setOperators] = useState<Operator[]>([]);
  const operatorService = new OperatorService(new OperatorRepository());
  useEffect(() => {
    setOperators(operatorService.getAll());
  }, []);
  const handleChangeUser = (id: string | undefined) => {
    if (!id) {
      return;
    }
    const operator = operatorService.getOne(id);
    if (!operator) {
      return;
    }
    UserSession.setCurrentUserId(id);
    UserSession.setCurrentUserName(operator.name);
    setCurrentUserName(operator.name);
    alert(`Você logou como ${operator.name}`);
  };
  return (
    <>
      <div className="container">
        <h1>
          {currentUserName
            ? `Logado como ${currentUserName} - Trocar de Usuário`
            : "Não Logado - Escolha um Usuário"}
        </h1>
        {operators.map((operator) => (
          <Paper
            key={operator.id}
            elevation={2}
            style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
          >
            <h2 style={{ margin: 0 }}>Nome: {operator.name}</h2>
            <h2 style={{ margin: 0 }}>Iniciais: {operator.initials}</h2>
            <Button
              variant="contained"
              onClick={() => {
                handleChangeUser(operator.id);
              }}
            >
              Selecionar
            </Button>
          </Paper>
        ))}
      </div>
    </>
  );
}
