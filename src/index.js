import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from "./Database/db.js";
import routes from "./routes.js"
import cors from 'cors';

import env from "dotenv"
env.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json()); // para application/json
app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded
app.use(cors()); //configuração do cors

app.use(routes);

connectDatabase()
  .then(() => {app.listen(PORT, () => {console.log("Servidor e Banco de Dados conectados!")})})
  .catch((error) => { console.log(error)});