import Loki from "lokijs";

export const DELIVERIES_COL = "deliveries";
export const OPERATORS_COL = "operators";
export const RESIDENTS_COL = "residents";
export const WITHDRAWALS_COL = "withdrawals";

function initializeDatabase() {
  const deliveries = database.getCollection(DELIVERIES_COL);
  if (!deliveries) {
    database.addCollection(DELIVERIES_COL);
  }
  const operators = database.getCollection(OPERATORS_COL);
  if (!operators) {
    database.addCollection(OPERATORS_COL);
  }
  const residents = database.getCollection(RESIDENTS_COL);
  if (!residents) {
    database.addCollection(RESIDENTS_COL);
  }
  const withdrawals = database.getCollection(WITHDRAWALS_COL);
  if (!withdrawals) {
    database.addCollection(WITHDRAWALS_COL);
  }
}

const database = new Loki("database", {
  env: "BROWSER",
  autoload: true,
  autoloadCallback: initializeDatabase,
  autosave: true,
  autosaveInterval: 3000,
  persistenceMethod: "localStorage",
});

export default database;
