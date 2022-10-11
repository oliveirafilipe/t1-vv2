import Delivery from "../domain/models/Delivery";
import Operator from "../domain/models/Operator";
import Resident from "../domain/models/Resident";
import { DeliveriesService } from "../domain/services/DeliveriesService";
import { OperatorService } from "../domain/services/OperatorService";
import { ResidentService } from "../domain/services/ResidentService";
import { WithdrawalsService } from "../domain/services/WithdrawalsService";
import { DeliverRepository } from "../external/repositories/DeliveryRepository";
import { OperatorRepository } from "../external/repositories/OperatorRepository";
import { ResidentRepository } from "../external/repositories/ResidentRepository";
import { WithdrawnRepository } from "../external/repositories/WithdrawnRepository";

export default function seed() {
  if (localStorage.getItem("seedApplied") === "1") {
    console.log("Seed ja aplicada.");
    return;
  }
  localStorage.setItem("seedApplied", "1");

  const originalRandom = Math.random;

  Math.random = randomSeedSin();

  const savedOperators = operatorsSeed();
  const savedResidents = residentsSeed();
  const savedDeliveries = deliveriesSeed(savedOperators, savedResidents);
  collectsSeed(savedOperators, savedResidents, savedDeliveries);

  Math.random = originalRandom;
}

function collectsSeed(
  savedOperators: Operator[],
  savedResidents: Resident[],
  savedDeliveries: Delivery[]
) {
  const withdrawalsService = new WithdrawalsService(
    new WithdrawnRepository(),
    new DeliveriesService(new DeliverRepository())
  );

  for (let i = 0; i < Math.floor(savedDeliveries.length / 3); i++) {
    const delivery =
      savedDeliveries[getRandomArbitrary(0, savedDeliveries.length)];

    const operator =
      savedOperators[getRandomArbitrary(0, savedOperators.length)];

    const resident =
      savedResidents[getRandomArbitrary(0, savedResidents.length)];

    const maxRandomDate = new Date(new Date(delivery.date).getTime());
    maxRandomDate.setDate(maxRandomDate.getDate() + 5);

    withdrawalsService.save({
      date: randomDate(new Date(delivery.date), maxRandomDate, 0, 24),
      deliveryId: delivery.id || "",
      operatorId: operator.id || "",
      residentId: resident.id || "",
    });
  }
}
function deliveriesSeed(
  savedOperators: Operator[],
  savedResidents: Resident[]
) {
  const deliveryService = new DeliveriesService(new DeliverRepository());

  //www.tudoconstrucao.com/lista-de-material-de-construcao-para-obra-basico/#Materiais_de_construcao_para_acabamento
  const deliveries = [
    "Abraçadeira lamp. Fluor",
    "Acabamento para Registro 3/4″",
    "Assento p/ bacia soft close",
    "Acessórios para Instalação da Bacia Sánitaria",
    "Bacia p/ Caixa Acoplada Sistema Dual Flux",
    "Bocal porcelana",
    "Border",
    "Box de Banheiro vidro liso",
    "Bucha nylon T 6mm",
    "Caixa acoplada Sistema Dual Flux",
    "Condicionador de Ar 9000btu",
    "Corrimão da Escada",
    "Escada",
    "Fita Crepe",
    "Fundo Nivelador",
    "Fundo Preparador",
    "Gesso Acabamento negativo",
    "Gesso Detalhe",
    "Gesso Fechamento",
    "Gesso Foro liso",
    "Gesso Sanca Fechada",
    "Granito p/ Sacada 3,90m",
    "Grelha quadrada 100mm p/ Ralo Inóx",
    "Lâmpada Econômica 11w",
    "Lâmpada Econômica 15w",
    "Lâmpada Econômica 20w",
    "Lâmpada Econômica 23w",
    "Lâmpada Fluorescente T5 28w",
    "Lâmpada Incandescente",
    "Lixa madeira grão 100",
    "Lixa massa grão 120",
    "Lixa massa grão 220",
    "Lixa massa grão 80",
    "Lona plastica preta",
    "Luminária de embutir 2x28w",
    "Luminária plafon",
    "Massa Acrilica",
    "Massa Corrida",
    "Massa flex",
    "Plafon simples",
    "Prego s/ Cabeça 13x15",
    "Reator eletrônico 2x28w",
    "Receptaculo tomadinha",
    "Rodapé poliestireno 10cm largura",
    "Rolo alumínio",
    "Sacada Modelo 5 Tubos",
    "Solvente farben 5",
    "Soquete lâmpada",
    "Tinta Acrílica",
    "Tinta Esmalte",
  ];

  const savedDeliveries: Delivery[] = [];

  for (const delivery of deliveries) {
    savedDeliveries.push(
      deliveryService.save({
        alreadyCollected: false,
        date: randomDate(
          new Date(2022, 0, 1),
          new Date(2022, 0, 15),
          0,
          24
        ).toISOString(),
        description: delivery,
        houseNumber:
          savedResidents[getRandomArbitrary(0, savedResidents.length)]
            .houseNumber,
        operatorId:
          savedOperators[getRandomArbitrary(0, savedOperators.length)].id || "",
      })
    );
  }
  return savedDeliveries;
}
function residentsSeed(): Resident[] {
  const residentService = new ResidentService(new ResidentRepository());

  const residents = [
    "Samuel Pinto",
    "Maria Luiza Moura",
    "Sr. Leandro Araújo",
    "Luiz Felipe Araújo",
    "Vitória Sales",
    "Dr. João Guilherme Viana",
    "Isabella Moreira",
    "Bruno Costa",
    "Natália Nascimento",
    "Sabrina Caldeira",
    "João Lucas Sales",
    "Dra. Olivia Souza",
    "Cecília da Paz",
    "Otávio Souza",
    "Juan Fogaça",
    "Sra. Eduarda Moreira",
    "Agatha Ramos",
    "Fernando Rodrigues",
    "Sophia Jesus",
    "Emilly Moura",
    "Luiz Fernando Nascimento",
    "Davi Lucca Pinto",
    "Luiz Otávio da Rosa",
    "Milena Melo",
    "Alexia Cavalcanti",
    "Laura Santos",
    "Daniela Porto",
    "Milena da Rocha",
    "Bryan Vieira",
    "Dr. Isaac Fogaça",
    "Davi Rezende",
    "Miguel da Cunha",
    "João Oliveira",
    "Luiza Almeida",
    "Ian Santos",
    "Sra. Heloísa Ramos",
    "Milena Costa",
    "Dr. Pedro Lucas Alves",
    "Guilherme Ramos",
    "Emanuelly Teixeira",
    "Erick Novaes",
    "Sr. Vinicius Rezende",
    "Marcela Castro",
    "Valentina Sales",
    "Sra. Isis Dias",
    "Maysa Teixeira",
    "Maria Julia da Cruz",
    "Heitor Viana",
    "Carlos Eduardo Novaes",
    "Marcos Vinicius Fogaça",
    "Eduarda Rocha",
    "Lucca da Mota",
    "Srta. Maitê Dias",
    "Ana Laura Cardoso",
    "Srta. Sofia da Cunha",
    "Pedro Henrique da Rocha",
    "Miguel Vieira",
    "Vitor da Costa",
    "Vitor Hugo Costa",
    "Guilherme Oliveira",
    "Srta. Melissa da Rosa",
    "Luana Monteiro",
    "Pedro Cardoso",
    "Eduarda Moura",
    "Isabelly Nogueira",
    "Milena Nogueira",
    "Isabel Rezende",
    "Levi Nunes",
    "Benício Dias",
    "Kamilly Alves",
    "Dra. Marina Martins",
    "Srta. Ana Júlia Almeida",
    "Diogo Moura",
    "Otávio Rocha",
    "Emanuel Rezende",
    "Vitória da Paz",
    "Enrico Pires",
    "Arthur Moreira",
    "Sr. Vitor Gabriel Silva",
    "Davi Lucca Oliveira",
    "Pietro Silva",
    "Cecília Cavalcanti",
    "Kaique Mendes",
    "João Gabriel da Mata",
    "Olivia da Conceição",
    "Levi Ramos",
    "Natália Silveira",
    "Natália Pereira",
    "João Felipe Ferreira",
    "Luiz Henrique da Rosa",
    "Murilo Caldeira",
    "Cauã da Rocha",
    "Ana Júlia Moreira",
    "Sra. Milena Ribeiro",
    "Srta. Luna Mendes",
    "Kaique Cardoso",
    "Caio Souza",
    "Davi Lucca Cardoso",
    "Arthur da Luz",
    "Sr. Theo Moraes",
  ];

  const countPerHouseNumber: { [key: number]: number } = {};
  const savedResidents = [];
  for (const resident of residents) {
    let houseNumber;
    do {
      houseNumber = Math.floor(Math.random() * 50);
      if (!countPerHouseNumber[houseNumber]) {
        countPerHouseNumber[houseNumber] = 0;
      }
    } while (
      countPerHouseNumber[houseNumber] + 1 >=
      ResidentService.MAX_HOUSE_RESIDENTS
    );

    countPerHouseNumber[houseNumber]++;

    while (true) {
      try {
        const savedResident = residentService.save({
          active: true,
          houseNumber: `${houseNumber}`,
          name: resident,
          rg: `${getRandomArbitrary(0, 5000)}`.padStart(4, "0"),
        });
        savedResidents.push(savedResident);
        break;
      } catch (e) {
        console.log(e);
      }
    }
  }
  return savedResidents;
}

function operatorsSeed() {
  const operatorService = new OperatorService(new OperatorRepository());

  const operators = [
    "Bianca Moraes",
    "Letícia Pinto",
    "Renan Santos",
    "Rebeca Santos",
    "Pedro Aragão",
    "Gabriel Cardoso",
    "Luiz Miguel Souza",
    "Milena Cunha",
    "Kaique Ramos",
    "Calebe da Cunha",
  ];

  const savedOperators: Operator[] = [];

  for (const operator of operators) {
    savedOperators.push(
      operatorService.save({
        name: operator,
        initials: operator.match(/[A-Z]/g)?.join("") || "XXX",
      })
    );
  }

  return savedOperators;
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

//stackoverflow.com/a/31379050/13152732
function randomDate(
  start: Date,
  end: Date,
  startHour: number,
  endHour: number
) {
  var date = new Date(
    +start + Math.random() * (end.getTime() - start.getTime())
  );
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

function randomSeedSin(seed = Math.PI / 4) {
  // ~3.4 million b4 repeat.
  // https://stackoverflow.com/a/19303725/1791917
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}
