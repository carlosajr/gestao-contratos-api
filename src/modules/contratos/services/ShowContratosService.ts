import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class ShowContratoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(id: string): Promise<Contrato> {
    const contrato = await this.contratosRepository.show(id);

    if (!contrato) {
      throw new AppError("Não encontrei o contrato");
    }

    return contrato;
  }
}

export default ShowContratoService;
