import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import SessionsController from "../controllers/SessionsController";

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  sessionsController.create
);

export default sessionsRoutes;
