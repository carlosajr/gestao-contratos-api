import BCryptHashProvider from "@modules/usuarios/providers/implementations/BCryptHashProvider";
import IHashProvider from "@modules/usuarios/providers/models/IHashProvider";
import { container } from "tsyringe";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
