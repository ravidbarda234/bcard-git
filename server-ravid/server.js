const chalk = require("chalk");
const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./router/router");
const cors = require("cors");
const connectToDb = require("./DB/dbService");

const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");
const morganLogger = require("./logger/morganLogger");

app.use(morganLogger);
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
  connectToDb();
  // generateInitialCards();
  // generateInitialUsers();
});
