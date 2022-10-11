import { Button, Paper } from "@mui/material";
import { DeliveriesService } from "../../../domain/services/DeliveriesService";
import { WithdrawnService } from "../../../domain/services/WithdrawnService";
import { DeliveryRepository } from "../../../external/repositories/DeliveryRepository";
import { WithdrawnRepository } from "../../../external/repositories/WithdrawnRepository";

export default function Dashboard() {
  const deliveryService = new DeliveriesService(new DeliveryRepository());
  const withdrawnService = new WithdrawnService(
    new WithdrawnRepository(),
    deliveryService
  );
  const last7DaysAmount = withdrawnService.getLastXDays(7).length;
  const deliveriesNotCollectedAmount =
    deliveryService.getAllNotCollected().length;
  const collectedDeliveries = deliveryService.getAllCollected();
  const getAverageCollectionTime = (): string => {
    let days = 0;
    collectedDeliveries.forEach((delivery) => {
      if (!delivery.id) {
        return;
      }
      const withdrawn = withdrawnService.getByDeliveryId(delivery.id);
      if (!withdrawn) {
        return;
      }
      const date1 = new Date(delivery.date);
      const date2 = new Date(withdrawn.date);
      const daysDiff = Math.abs(date1.getTime() - date2.getTime());
      days += daysDiff / (1000 * 3600 * 24);
    });
    return (days / collectedDeliveries.length).toFixed(2).replace(".", ",");
  };
  const downloadReport = () => {
    const csvHeader =
      "entrega;data-hora;descrição;casa;operador;retirada;morador\n";
    let csvRows = "";
    collectedDeliveries.forEach((delivery) => {
      if (!delivery.id) {
        return;
      }
      const withdrawn = withdrawnService.getByDeliveryId(delivery.id);
      if (!withdrawn) {
        return;
      }
      csvRows += `${delivery.id};${delivery.date};${delivery.description};${delivery.houseNumber};${withdrawn.operatorId};${withdrawn.date};${withdrawn.residentId}\n`;
    });
    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "relatorio.csv");
    link.click();
  };
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <Paper
        elevation={2}
        style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
      >
        <h2 style={{ margin: 0 }}>Estatísticas</h2>
        <h3 style={{ margin: "0.3rem" }}>
          Número de entregas nos últimos 7 dias: {last7DaysAmount}
        </h3>
        <h3 style={{ margin: "0.3rem" }}>
          Quantidade de entregas ainda não retiradas:{" "}
          {deliveriesNotCollectedAmount}
        </h3>
        <h3 style={{ margin: "0.3rem" }}>
          Tempo médio entre registro e retirada de entregas:{" "}
          {getAverageCollectionTime()} dias
        </h3>
      </Paper>
      <Paper
        elevation={2}
        style={{ padding: "1rem", margin: "0.4rem", width: "100%" }}
      >
        <h2 style={{ margin: 0 }}>Relatório</h2>
        <h3 style={{ margin: "0.3rem" }}>
          Clique no botão abaixo para gerar o relatório.
        </h3>
        <Button variant="contained" onClick={downloadReport}>
          Gerar Relatório
        </Button>
      </Paper>
    </div>
  );
}
