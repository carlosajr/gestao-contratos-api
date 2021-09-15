import PrestadoresController from "@modules/prestadores/infra/http/controllers/PrestadoresController";
import ensureAuthenticated from "@modules/usuarios/infra/http/middlewares/ensureAuthenticated";
import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

const prestadoresRoutes = Router();
const prestadoresController = new PrestadoresController();

prestadoresRoutes.use(ensureAuthenticated);
// tipo_pessoa,cpf_cnpj,nome,email,cep,endereco,numero,complemento,bairro,cidade,estado,
prestadoresRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      tipo_pessoa: Joi.string().required(),
      cpf_cnpj: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cep: Joi.string().length(8).required(),
      endereco: Joi.string().required(),
      numero: Joi.number().required(),
      complemento: Joi.string().allow(null, ""),
      bairro: Joi.string().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
    },
  }),
  prestadoresController.create
);
prestadoresRoutes.get("/", prestadoresController.index);
prestadoresRoutes.get("/:prestador_id", prestadoresController.show);
prestadoresRoutes.put(
  "/:prestador_id",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cep: Joi.string().length(8).required(),
      endereco: Joi.string().required(),
      numero: Joi.number().required(),
      complemento: Joi.string().allow(null, ""),
      bairro: Joi.string().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
    },
  }),
  prestadoresController.update
);
prestadoresRoutes.delete("/:prestador_id", prestadoresController.delete);

export default prestadoresRoutes;
