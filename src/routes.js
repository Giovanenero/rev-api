import { Router } from "express";
import { createuser, getusers, deleteuser } from "./Controllers/UserController.js";

const routes = Router();

routes.post('/createuser', createuser);
routes.get('/getusers', getusers);
routes.delete('/deleteuser', deleteuser);

export default routes;