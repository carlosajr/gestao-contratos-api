import ICreatePrestadorDTO from "@modules/prestadores/dtos/ICreatePrestadorDTO";
import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadorRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { getRepository, Repository } from "typeorm";

class PrestadorRepository implements IPrestadorRepository {
  private ormRepository: Repository<Prestador>;

  constructor() {
    this.ormRepository = getRepository(Prestador);
  }

  public async create(dataPrestador: ICreatePrestadorDTO): Promise<Prestador> {
    const prestador = this.ormRepository.create(dataPrestador);

    await this.ormRepository.save(prestador);

    return prestador;
  }

  public async index(): Promise<Prestador[]> {
    const prestadores = await this.ormRepository.find({
      where: { ativo: true },
    });

    return prestadores;
  }

  public async show(id: string): Promise<Prestador | undefined> {
    const prestador = await this.ormRepository.findOne({
      where: { id, ativo: true },
    });

    return prestador;
  }

  public async update(prestador: Prestador): Promise<Prestador> {
    await this.ormRepository.save(prestador);

    return prestador;
  }

  public async findById(id: string): Promise<Prestador | undefined> {
    const findPrestador = await this.ormRepository.findOne({
      where: { id, ativo: true },
    });

    return findPrestador;
  }

  public async findByEmail(email: string): Promise<Prestador | undefined> {
    const findPrestador = await this.ormRepository.findOne({
      where: { email, ativo: true },
    });

    return findPrestador;
  }

  public async findByCpf_cnpj(
    cpf_cnpj: string
  ): Promise<Prestador | undefined> {
    const findPrestador = await this.ormRepository.findOne({
      where: { cpf_cnpj, ativo: true },
    });

    return findPrestador;
  }
}

export default PrestadorRepository;
