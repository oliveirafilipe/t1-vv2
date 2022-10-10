import { Button, InputAdornment, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Delivery from "../../../domain/models/Delivery";
import Withdrawn from "../../../domain/models/Withdrawn";
import { DeliveriesService } from "../../../domain/services/DeliveriesService";
import { OperatorService } from "../../../domain/services/OperatorService";
import { ResidentService } from "../../../domain/services/ResidentService";
import { WithdrawalsService } from "../../../domain/services/WithdrawalsService";
import { DeliverRepository } from "../../../external/repositories/DeliveryRepository";
import { OperatorRepository } from "../../../external/repositories/OperatorRepository";
import { ResidentRepository } from "../../../external/repositories/ResidentRepository";
import { WithdrawnRepository } from "../../../external/repositories/WithdrawnRepository";
import DateTimePicker from "../../components/DateTimePicker";
import UserSession from "../../session/user";
import Resident from "../../../domain/models/Resident";

const theme = createTheme();
const residentService = new ResidentService(new ResidentRepository());
const deliveryService = new DeliveriesService(new DeliverRepository());
const operatorService = new OperatorService(new OperatorRepository());
const withdrawalsService = new WithdrawalsService(new WithdrawnRepository());


export default function Withdrawals() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [resident, setResident] = useState<Resident | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [withdrawnTime, setWithdrawnTime] = useState<Date | null>(null);
  const [withdrawals, setWithdrawals] = useState<Withdrawn[]>([]);

  useEffect(() => {
    setDeliveries(deliveryService.getAll());
    setWithdrawals(withdrawalsService.getAll());
    setIsLoaded(true);
    setResidents(residentService.getAll());
}, []);


  const handleSubmit = () => {
    for (const iterator of [delivery, resident, loggedUserId, withdrawnTime]) {
      if (iterator == null || iterator == "") {
        alert("Preencha todos os campos");
        return;
      }
    }
    withdrawalsService.save({
      deliveryId: delivery?.id || "",
      date: withdrawnTime || new Date(),
      residentId: resident?.id || "",
      operatorId: loggedUserId,
    });
    setWithdrawals(withdrawalsService.getAll());
  };

  const idToOperator = (operatorId: string) => {
    const operator = operatorService.getOne(operatorId);
    return `${operator?.name} (${operator?.initials})`;
  };
  
  const loggedUserId = UserSession.getCurrentUserId();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Cadastrar Retirada</h1>
      {!isLoaded && <p>Loading...</p>}
      {!loggedUserId && <p>Nenhum Operador Logado. Realize o Login.</p>}
      {isLoaded && residents.length === 0 && (
        <p>Nenhum Morador Cadastrado. Cadastre Morador</p>
      )}
      {isLoaded && deliveries.length === 0 && (
        <p>Nenhuma Entrega Cadastrada. Cadastre Novas Entregas</p>
      )}
      {isLoaded && residents.length > 0 && loggedUserId && deliveries.length > 0 &&(
        <Grid container spacing={3}>
          <Grid item lg={6} sm={12}>
            <DateTimePicker
              onChange={setWithdrawnTime}
              label="Data/Hora da Retirada"
            />
          </Grid>
          <Box width="100%" />
          <Grid item lg={6} sm={12}>
            <Autocomplete
              getOptionLabel={option => option.description}
              options={deliveries}
              id="open-on-focus"
              openOnFocus
              onChange={(e, v) => {
                setDelivery(v);
                console.log(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Entrega a ser retirada"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Box width="100%" />
          <Grid item lg={6} sm={12}>
            <Autocomplete
              getOptionLabel={option => option.name}
              options={residents}
              id="open-on-focus"
              openOnFocus
              onChange={(e, v) => {
                setResident(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Nome do residente"
                  variant="standard"
                />
              )}
            />
          </Grid>
          <Box width="100%" />
          <Grid item lg={6} sm={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      )}
      <div className="container" style={{ marginTop: "2rem" }}>
        <h1>Retiradas Cadastradas</h1>
        {withdrawals.map((withdrawn) => (
          <Paper
            key={withdrawn.id}
            elevation={2}
            style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
          >
            <h2 style={{ margin: 0 }}>Data da retirada: {withdrawn.date.toString()}</h2>
            <h3 style={{ margin: 0 }}>Resitente que retirou: {withdrawn.residentId}</h3>
            <h4 style={{ margin: 0 }}>Id da entrega: {withdrawn.deliveryId}</h4>
          </Paper>
        ))}
      </div>
    </ThemeProvider>
  );
}
