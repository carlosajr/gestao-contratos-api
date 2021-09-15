import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import UsuarioController from "../controllers/UsuariosController";

const usuariosRoutes = Router();
const usuarioController = new UsuarioController();

usuariosRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  usuarioController.create
);

export default usuariosRoutes;
