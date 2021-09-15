import ICreatePrestadorDTO from "@modules/prestadores/dtos/ICreatePrestadorDTO";
import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";

export default interface IPrestadorRepository {
  create(data: ICreatePrestadorDTO): Promise<Prestador>;
  index(): Promise<Prestador[]>;
  show(id: string): Promise<Prestador | undefined>;
  update(prestador: Prestador): Promise<Prestador>;
  findById(id: string): Promise<Prestador | undefined>;
  findByEmail(email: string): Promise<Prestador | undefined>;
  findByCpf_cnpj(cpf_cnpj: string): Promise<Prestador | undefined>;
}
