import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class DeletePrestadorService {
  constructor(
    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(id: string): Promise<Prestador> {
    const prestador = await this.prestadoresRepository.findById(id);

    if (!prestador) {
      throw new AppError("Prestador não encontrado");
    }

    prestador.ativo = false;

    return this.prestadoresRepository.update(prestador);
  }
}

export default DeletePrestadorService;
