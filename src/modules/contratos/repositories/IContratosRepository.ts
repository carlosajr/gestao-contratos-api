import IContratoPrestadorDTO from "@modules/contratos/dtos/ICreateContratoDTO";
import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";

export default interface IPrestadorRepository {
  create(data: IContratoPrestadorDTO): Promise<Contrato>;
  index(): Promise<Contrato[]>;
  show(id: string): Promise<Contrato | undefined>;
  update(contrato: Contrato): Promise<Contrato>;
  findById(id: string): Promise<Contrato | undefined>;
  findByDataFim(data_limite: Date): Promise<Contrato[] | undefined>;
}
