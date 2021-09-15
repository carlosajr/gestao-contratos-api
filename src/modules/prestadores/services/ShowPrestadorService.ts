import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class ShowPrestadorService {
  constructor(
    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(id: string): Promise<Prestador> {
    const prestador = await this.prestadoresRepository.show(id);

    if (!prestador) {
      throw new AppError("Não encontreio prestador");
    }

    return prestador;
  }
}

export default ShowPrestadorService;
