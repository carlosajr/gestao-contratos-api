import Estado from "@modules/estados/infra/typeorm/entities/Estado";

export default interface IEstadoRepository {
  findAll(): Promise<Estado[]>;
}
