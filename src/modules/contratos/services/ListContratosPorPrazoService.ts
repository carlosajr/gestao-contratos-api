import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ListContratosPorPrazoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(prazo: number): Promise<Contrato[]> {
    const dataLimite = dayjs().add(prazo, "days").toDate();
    const contratos = await this.contratosRepository.findByDataFim(dataLimite);

    return contratos;
  }
}

export default ListContratosPorPrazoService;
