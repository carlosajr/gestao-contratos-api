import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

import CidadesController from "../controllers/CidadesController";

const cidadesRoutes = Router();
const cidadeController = new CidadesController();

cidadesRoutes.use(ensureAuthenticated);

cidadesRoutes.get("/", cidadeController.index);

export default cidadesRoutes;
