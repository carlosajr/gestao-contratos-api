import ICreateCidadeDTO from "@modules/cidades/dtos/ICreateCidadeDTO";
import Cidade from "@modules/cidades/infra/typeorm/entities/Cidade";
import ICidadeRepository from "@modules/cidades/repositories/ICidadesRepository";
import { v4 as uuid } from "uuid";

class CidadesRepository implements ICidadeRepository {
  private cidades: Cidade[] = [];

  public async findAll(): Promise<Cidade[]> {
    return this.cidades;
  }

  public async findByCodigo(codigo: number): Promise<Cidade | undefined> {
    const cidadeComCodigo = this.cidades.find(
      (cidade) => cidade.codigo === codigo
    );

    return cidadeComCodigo;
  }

  public async findByCodigoEstado(codigo_estado: number): Promise<Cidade[]> {
    const cidadeComCodigoEstado: Cidade[] = [];

    this.cidades.forEach(function (cidade) {
      if (cidade.codigo_estado === codigo_estado)
        cidadeComCodigoEstado.push(cidade);
    });

    return cidadeComCodigoEstado;
  }

  public async create({ codigo, nome }: ICreateCidadeDTO): Promise<Cidade> {
    const cidade = new Cidade();

    Object.assign(cidade, { id: uuid(), codigo, nome });

    this.cidades.push(cidade);

    return cidade;
  }
}

export default CidadesRepository;
