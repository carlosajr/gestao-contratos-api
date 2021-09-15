import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuarioRepository from "@modules/usuarios/repositories/IUsuarioRepository";
import { getRepository, Repository } from "typeorm";

class UsuariosRepository implements IUsuarioRepository {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = getRepository(Usuario);
  }

  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const findCidade = await this.ormRepository.findOne({
      where: { email },
    });
    return findCidade || undefined;
  }

  public async create({
    nome,
    email,
    senha,
  }: ICreateUsuarioDTO): Promise<Usuario> {
    const cidade = this.ormRepository.create({ nome, email, senha });

    await this.ormRepository.save(cidade);

    return cidade;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }
}

export default UsuariosRepository;
