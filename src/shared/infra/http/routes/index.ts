import cidadesRoutes from "@modules/cidades/infra/http/routes/cidades.routes";
import contratosRoutes from "@modules/contratos/infra/http/routes/contratos.routes";
import estadosRoutes from "@modules/estados/infra/http/routes/estados.routes";
import prestadoresRoutes from "@modules/prestadores/infra/http/routes/prestadores.routes";
import sessionsRoutes from "@modules/usuarios/infra/http/routes/sessions.routes";
import usuariosRoutes from "@modules/usuarios/infra/http/routes/usuarios.routes";
import { Router } from "express";

import cepRoutes from "./cep.routes";
import infoRoutes from "./info.routes";

const routes = Router();

routes.use("/", infoRoutes);
routes.use("/cep", cepRoutes);
routes.use("/cidades", cidadesRoutes);
routes.use("/estados", estadosRoutes);
routes.use("/usuarios", usuariosRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/prestadores", prestadoresRoutes);
routes.use("/contratos", contratosRoutes);

export default routes;
