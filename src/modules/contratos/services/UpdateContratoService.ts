import IUpdateContratoDTO from "@modules/contratos/dtos/IUpdateContratoDTO";
import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class UpdateContratoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(dataContrato: IUpdateContratoDTO): Promise<Contrato> {
    const contrato = await this.contratosRepository.findById(
      dataContrato.contrato_id
    );

    if (!contrato) {
      throw new AppError("Contrato não encontrado");
    }

    contrato.prestador_id = dataContrato.prestador_id;
    contrato.servico_prestado = dataContrato.servico_prestado;
    contrato.data_inicio = dataContrato.data_inicio;
    contrato.data_fim = dataContrato.data_fim;

    return this.contratosRepository.update(contrato);
  }
}

export default UpdateContratoService;
