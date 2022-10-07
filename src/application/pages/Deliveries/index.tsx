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
import { DeliveriesService } from "../../../domain/services/DeliveriesService";
import { OperatorService } from "../../../domain/services/OperatorService";
import { ResidentService } from "../../../domain/services/ResidentService";
import { DeliverRepository } from "../../../external/repositories/DeliveryRepository";
import { OperatorRepository } from "../../../external/repositories/OperatorRepository";
import { ResidentRepository } from "../../../external/repositories/ResidentRepository";
import DateTimePicker from "../../components/DateTimePicker";
import UserSession from "../../session/user";

const theme = createTheme();
const residentService = new ResidentService(new ResidentRepository());
const deliveryService = new DeliveriesService(new DeliverRepository());
const operatorService = new OperatorService(new OperatorRepository());

export default function Deliveries() {
  const [homes, setHomes] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [home, setHome] = useState<string | null>(null);
  const [receivedTime, setReceivedTime] = useState<string | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setHomes(residentService.getAllHomes());
    setDeliveries(deliveryService.getAll());
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(() => searchDeliveries(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  const searchDeliveries = (query: string) => {
    if (!query) setDeliveries(deliveryService.getAll());

    setDeliveries(deliveryService.filterByDescription(query));
  };
  const handleSubmit = () => {
    for (const iterator of [description, home, loggedUserId, receivedTime]) {
      if (iterator == null || iterator == "") {
        alert("Preencha todos os campos");
        return;
      }
    }
    deliveryService.save({
      date: receivedTime || "",
      description,
      houseNumber: home || "",
      operatorId: loggedUserId,
    });
    setDeliveries(deliveryService.getAll());
  };
  const idToOperator = (operatorId: string) => {
    const operator = operatorService.getOne(operatorId);
    return `${operator?.name} (${operator?.initials})`;
  };
  const loggedUserId = UserSession.getCurrentUserId();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Cadastrar Entrega</h1>
      {!isLoaded && <p>Loading...</p>}
      {!loggedUserId && <p>Nenhum Operador Logado. Realize o Login.</p>}
      {isLoaded && homes.length === 0 && (
        <p>Nenhum Morador Cadastrado. Cadastre Morador</p>
      )}
      {isLoaded && homes.length > 0 && loggedUserId && (
        <Grid container spacing={3}>
          <Grid item lg={6} sm={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Descrição"
              variant="standard"
              multiline
              rows={2}
              maxRows={4}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Box width="100%" />
          <Grid item lg={6} sm={12}>
            <DateTimePicker
              onChange={setReceivedTime}
              label="Data/Hora do Recebimento"
            />
          </Grid>
          <Box width="100%" />
          <Grid item lg={6} sm={12}>
            <Autocomplete
              options={homes}
              id="open-on-focus"
              openOnFocus
              onChange={(e, v) => {
                setHome(v);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Casa do Destinatário"
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
        <h1>Entregas Cadastradas</h1>
        <TextField
          style={{ marginBottom: "1rem" }}
          id="input-with-icon-textfield"
          label="Procurar por Descrição"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        {deliveries.map((delivery) => (
          <Paper
            key={delivery.id}
            elevation={2}
            style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
          >
            <h2 style={{ margin: 0 }}>Descrição: {delivery.description}</h2>
            <h3 style={{ margin: 0 }}>Data de Chegada: {delivery.date}</h3>
            <h3 style={{ margin: 0 }}>
              Casa Destinatária: {delivery.houseNumber}
            </h3>
            <h3 style={{ margin: 0 }}>
              Operador que Recebeu: {idToOperator(delivery.operatorId)}
            </h3>
          </Paper>
        ))}
      </div>
    </ThemeProvider>
  );
}
