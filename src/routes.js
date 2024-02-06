import { Router } from "express";
import UserController from "./Controllers/UserController.js";

const routes = Router();

routes.post('/createuser', UserController.createuser);
routes.post('/login', UserController.login);
routes.post('/verifyuser', UserController.verifyuser);

export default routes;