import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class DeletePrestadorService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(id: string): Promise<Contrato> {
    const contrato = await this.contratosRepository.findById(id);

    if (!contrato) {
      throw new AppError("Prestador não encontrado");
    }

    contrato.ativo = false;

    return this.contratosRepository.update(contrato);
  }
}

export default DeletePrestadorService;
