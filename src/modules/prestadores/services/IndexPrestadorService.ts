import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class IndexPrestadorService {
  constructor(
    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(): Promise<Prestador[]> {
    const prestadores = await this.prestadoresRepository.index();

    return prestadores;
  }
}

export default IndexPrestadorService;
