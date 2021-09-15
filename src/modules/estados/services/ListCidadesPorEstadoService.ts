import Cidade from "@modules/cidades/infra/typeorm/entities/Cidade";
import ICidadeRepository from "@modules/cidades/repositories/ICidadesRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

interface IRequestDTO {
  sigla_estado: string;
}

@injectable()
class ListCidadesPorEstadoService {
  constructor(
    @inject("CidadesRepository")
    private cidadesRepository: ICidadeRepository
  ) {
    //
  }

  public async execute({ sigla_estado }: IRequestDTO): Promise<Cidade[]> {
    const estados = await this.cidadesRepository.findBySiglaEstado(
      sigla_estado
    );
    return estados;
  }
}

export default ListCidadesPorEstadoService;
