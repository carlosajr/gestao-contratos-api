import { inject, injectable } from "tsyringe";

import ICepDTO from "@shared/dtos/ICepDTO";
import ICepProvider from "@shared/providers/models/ICepProvider";

@injectable()
class ConsultarCepService {
  constructor(
    @inject("CepProvider")
    private cepProvider: ICepProvider
  ) {
    //
  }

  public async execute(cep: string): Promise<ICepDTO> {
    const cepRequested = await this.cepProvider.consultarCep(cep);
    return cepRequested;
  }
}

export default ConsultarCepService;
