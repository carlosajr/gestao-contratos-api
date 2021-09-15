import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

Dayjs.extend(utc);

interface IResponseDTO {
  dias_restantes: number;
}

@injectable()
class ShowPrazoRestanteContratoService {
  constructor(
    @inject("ContratosRepository")
    private contratosRepository: IContratosRepository
  ) {
    //
  }

  public async execute(contrato_id: string): Promise<IResponseDTO> {
    const contrato = await this.contratosRepository.findById(contrato_id);

    const diasRestantes = Dayjs(contrato.data_fim).diff(Dayjs(), "days");

    const response = {
      dias_restantes: diasRestantes,
    };

    return response;
  }
}

export default ShowPrazoRestanteContratoService;
