import CidadesRepository from "@modules/cidades/infra/typeorm/repositories/CidadesRepository";
import ICidadeRepository from "@modules/cidades/repositories/ICidadesRepository";
import ContratosRepository from "@modules/contratos/infra/typeorm/repositories/ContratosRepository";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import EstadosRepository from "@modules/estados/infra/typeorm/repositories/EstadosRepository";
import IEstadoRepository from "@modules/estados/repositories/IEstadosRepository";
import PrestadoresRepository from "@modules/prestadores/infra/typeorm/repositories/PrestadoresRepository";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import UsuariosRepository from "@modules/usuarios/infra/typeorm/repositories/UsuarioRepository";
import IUsuarioRepository from "@modules/usuarios/repositories/IUsuarioRepository";
import { container } from "tsyringe";

import "@shared/providers/container";
import "@modules/usuarios/providers/container";

container.registerSingleton<ICidadeRepository>(
  "CidadesRepository",
  CidadesRepository
);

container.registerSingleton<IEstadoRepository>(
  "EstadosRepository",
  EstadosRepository
);

container.registerSingleton<IUsuarioRepository>(
  "UsuariosRepository",
  UsuariosRepository
);

container.registerSingleton<IPrestadoresRepository>(
  "PrestadoresRepository",
  PrestadoresRepository
);

container.registerSingleton<IContratosRepository>(
  "ContratosRepository",
  ContratosRepository
);
