import Estado from "@modules/estados/infra/typeorm/entities/Estado";
import IEstadosRepository from "@modules/estados/repositories/IEstadosRepository";

class EstadosRepository implements IEstadosRepository {
  private estados: Estado[] = [];

  public async findAll(): Promise<Estado[]> {
    return this.estados;
  }
}

export default EstadosRepository;
