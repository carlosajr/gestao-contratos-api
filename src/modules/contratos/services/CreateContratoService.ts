import ICreateContratoDTO from "@modules/contratos/dtos/ICreateContratoDTO";
import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class CreateContratoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository,

    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(dataContrato: ICreateContratoDTO): Promise<Contrato> {
    const prestador = await this.prestadoresRepository.findById(
      dataContrato.prestador_id
    );

    if (!prestador) {
      throw new AppError("Prestador não encontrado");
    }

    const contrato = await this.contratosRepository.create(dataContrato);

    return contrato;
  }
}

export default CreateContratoService;
