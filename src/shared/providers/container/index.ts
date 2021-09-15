import { container } from "tsyringe";

import ViaCEPCepProvider from "@shared/providers/implementations/ViaCEPCepProvider";
import ICepProvider from "@shared/providers/models/ICepProvider";

container.registerSingleton<ICepProvider>("CepProvider", ViaCEPCepProvider);
