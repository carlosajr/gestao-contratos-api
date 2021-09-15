import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import CepController from "@shared/infra/http/controllers/CepController";

const cepRoutes = Router();
const cepController = new CepController();

cepRoutes.use(ensureAuthenticated);

cepRoutes.get(
  "/:cep",
  celebrate({
    [Segments.PARAMS]: {
      cep: Joi.string().length(8).required(),
    },
  }),
  cepController.show
);

export default cepRoutes;
