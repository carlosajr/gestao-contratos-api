import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuarioRepository from "@modules/usuarios/repositories/IUsuarioRepository";
import { v4 as uuid } from "uuid";

class UsuariosRepository implements IUsuarioRepository {
  private usuarios: Usuario[] = [];

  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const usuarioComEmail = this.usuarios.find(
      (usuario) => usuario.email === email
    );

    return usuarioComEmail || undefined;
  }

  public async create({
    nome,
    email,
    senha,
  }: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = new Usuario();

    Object.assign(usuario, { id: uuid(), nome, email, senha });

    this.usuarios.push(usuario);

    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    const index = this.usuarios.findIndex(
      (findUsuario) => findUsuario.id === usuario.id
    );

    this.usuarios[index] = usuario;

    return usuario;
  }
}

export default UsuariosRepository;
