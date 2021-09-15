import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";

export default interface IUsuarioRepository {
  findByEmail(email: string): Promise<Usuario | undefined>;
  create(data: ICreateUsuarioDTO): Promise<Usuario>;
  save(usuario: Usuario): Promise<Usuario>;
}
