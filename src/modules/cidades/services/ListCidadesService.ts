import Cidade from "@modules/cidades/infra/typeorm/entities/Cidade";
import ICidadeRepository from "@modules/cidades/repositories/ICidadesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCidadesService {
  constructor(
    @inject("CidadesRepository")
    private cidadesRepository: ICidadeRepository
  ) {
    //
  }

  public async execute(): Promise<Cidade[]> {
    const cidades = await this.cidadesRepository.findAll();
    return cidades;
  }
}

export default ListCidadesService;
