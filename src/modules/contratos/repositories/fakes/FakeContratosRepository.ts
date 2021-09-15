import ICreateContratoDTO from "@modules/contratos/dtos/ICreateContratoDTO";
import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import IContratosRepository from "@modules/contratos/repositories/IContratosRepository";
import { v4 as uuid } from "uuid";

class ContratoRepository implements IContratosRepository {
  private contratos: Contrato[] = [];

  public async create({
    prestador_id,
    servico_prestado,
    data_inicio,
    data_fim,
  }: ICreateContratoDTO): Promise<Contrato> {
    const contrato = new Contrato();

    Object.assign(contrato, {
      id: uuid(),
      prestador_id,
      servico_prestado,
      data_inicio,
      data_fim,
    });

    this.contratos.push(contrato);

    return contrato;
  }

  public async index(): Promise<Contrato[]> {
    const contratosAtivos: Contrato[] = [];

    this.contratos.forEach(function (contrato) {
      if (contrato.ativo === true) contratosAtivos.push(contrato);
    });

    return contratosAtivos;
  }

  public async show(id: string): Promise<Contrato | undefined> {
    const findContrato = this.contratos.find((contrato) => contrato.id === id);

    return findContrato;
  }

  public async update(contrato: Contrato): Promise<Contrato> {
    const index = this.contratos.findIndex(
      (contratoInDB) => contratoInDB.id === contrato.id
    );

    this.contratos[index] = contrato;

    return this.contratos[index];
  }

  public async findById(id: string): Promise<Contrato | undefined> {
    const findContrato = this.contratos.find((contrato) => contrato.id === id);

    return findContrato;
  }

  public async findByDataFim(
    data_limite: Date
  ): Promise<Contrato[] | undefined> {
    const contratosAtivos: Contrato[] = [];

    this.contratos.forEach(function (contrato) {
      if (
        contrato.ativo === true &&
        contrato.data_inicio > new Date() &&
        contrato.data_fim < data_limite
      ) {
        contratosAtivos.push(contrato);
      }
    });

    return contratosAtivos;
  }
}

export default ContratoRepository;
