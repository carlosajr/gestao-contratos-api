import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class IndexContratosService {
  constructor(
    @inject("ContratosRepository")
    private pontratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(): Promise<Contrato[]> {
    const contratos = await this.pontratosRepository.index();

    return contratos;
  }
}

export default IndexContratosService;
