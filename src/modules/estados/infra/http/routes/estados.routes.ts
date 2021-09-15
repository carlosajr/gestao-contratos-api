import EstadosController from "@modules/estados/infra/http/controllers/EstadosController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const estadosRoutes = Router();
const estadosController = new EstadosController();

estadosRoutes.use(ensureAuthenticated);

estadosRoutes.get("/", estadosController.index);
estadosRoutes.get(
  "/:sigla_estado/cidades/",
  estadosController.showCidadesPorEstado
);

export default estadosRoutes;
