import express from 'express';
import bodyParser from 'body-parser';
import connectDatabase from "./Database/db.js";
import routes from "./routes.js"
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // para application/json
app.use(bodyParser.urlencoded({ extended: true })); // para application/x-www-form-urlencoded

app.use(routes);


// import User from './Models/User.js';

// app.post('/createuser', async (request, response) => {
//   try {
//     const user = request.body;
//     await User.create(user);
//     const users = await User.find();
//     return response.status(201).json(users);
//   } catch (error) {
//     return response.status(400).json(error);
//   }
// })

connectDatabase()
  .then(() => {app.listen(PORT, () => {console.log("Servidor e Banco de Dados conectados!")})})
  .catch((error) => { console.log(error)});