import Estado from "@modules/estados/infra/typeorm/entities/Estado";
import IEstadoRepository from "@modules/estados/repositories/IEstadosRepository";
import { getRepository, Repository } from "typeorm";

class EstadosRepository implements IEstadoRepository {
  private ormRepository: Repository<Estado>;

  constructor() {
    this.ormRepository = getRepository(Estado);
  }

  public async findAll(): Promise<Estado[]> {
    const cidades = await this.ormRepository.find();
    return cidades;
  }
}

export default EstadosRepository;
