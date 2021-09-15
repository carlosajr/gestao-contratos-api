import ICreateContratoDTO from "@modules/contratos/dtos/ICreateContratoDTO";
import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { getRepository, Repository, Between } from "typeorm";

class ContratoRepository implements IContratosRepository {
  private ormRepository: Repository<Contrato>;

  constructor() {
    this.ormRepository = getRepository(Contrato);
  }

  public async create(dataContrato: ICreateContratoDTO): Promise<Contrato> {
    const contrato = this.ormRepository.create(dataContrato);

    console.log(contrato);

    await this.ormRepository.save(contrato);

    return contrato;
  }

  public async index(): Promise<Contrato[]> {
    const contratos = await this.ormRepository.find({
      relations: ["prestador"],
      where: { ativo: true },
    });

    return contratos;
  }

  public async show(id: string): Promise<Contrato | undefined> {
    const contrato = await this.ormRepository.findOne({
      relations: ["prestador"],
      where: { id, ativo: true },
    });

    return contrato;
  }

  public async update(contrato: Contrato): Promise<Contrato> {
    await this.ormRepository.save(contrato);

    return contrato;
  }

  public async findById(id: string): Promise<Contrato | undefined> {
    const contrato = await this.ormRepository.findOne({
      where: { id, ativo: true },
    });

    return contrato;
  }

  public async findByDataFim(
    data_limite: Date
  ): Promise<Contrato[] | undefined> {
    const contratos = await this.ormRepository.find({
      relations: ["prestador"],
      where: {
        ativo: true,
        data_fim: Between(new Date(), data_limite),
      },
    });

    return contratos;
  }
}

export default ContratoRepository;
