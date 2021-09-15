import Estado from "@modules/estados/infra/typeorm/entities/Estado";
import IEstadoRepository from "@modules/estados/repositories/IEstadosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListEstadosService {
  constructor(
    @inject("EstadosRepository")
    private estadosRepository: IEstadoRepository
  ) {
    //
  }

  public async execute(): Promise<Estado[]> {
    const estados = await this.estadosRepository.findAll();
    return estados;
  }
}

export default ListEstadosService;
