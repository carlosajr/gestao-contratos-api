import ContratosController from "@modules/contratos/infra/http/controllers/ContratosController";
import ContratosFilterController from "@modules/contratos/infra/http/controllers/ContratosFilterController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

const contratosRoutes = Router();
const contratosController = new ContratosController();
const contratosFilterController = new ContratosFilterController();

contratosRoutes.use(ensureAuthenticated);

contratosRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      prestador_id: Joi.string().required(),
      servico_prestado: Joi.string().required(),
      data_inicio: Joi.date().required(),
      data_fim: Joi.date().required(),
    },
  }),
  contratosController.create
);
contratosRoutes.get("/", contratosController.index);
contratosRoutes.get("/:contrato_id", contratosController.show);
contratosRoutes.put(
  "/:contrato_id",
  celebrate({
    [Segments.BODY]: {
      prestador_id: Joi.string().required(),
      servico_prestado: Joi.string().required(),
      data_inicio: Joi.date().required(),
      data_fim: Joi.date().required(),
    },
  }),
  contratosController.update
);
contratosRoutes.delete("/:contrato_id", contratosController.delete);

contratosRoutes.get("/prazo/:prazo", contratosFilterController.list);
contratosRoutes.get("/prazo/:prazo/count/", contratosFilterController.count);
contratosRoutes.get(
  "/:contrato_id/prazo/restante/",
  contratosFilterController.show
);

export default contratosRoutes;
