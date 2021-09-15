import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

interface IResponseDTO {
  quantidade_contratos: number;
}

@injectable()
class CountContratosPorPrazoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(prazo: number): Promise<IResponseDTO> {
    const dataLimite = dayjs().add(prazo, "days").toDate();

    const contratos = await this.contratosRepository.findByDataFim(dataLimite);

    const quantidadeContratos = {
      quantidade_contratos: contratos.length,
    };

    return quantidadeContratos;
  }
}

export default CountContratosPorPrazoService;
