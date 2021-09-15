import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IHashProvider from "@modules/usuarios/providers/models/IHashProvider";
import IUsuarioRepository from "@modules/usuarios/repositories/IUsuarioRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

interface IRequestDTO {
  nome: string;
  email: string;
  senha: string;
}

@injectable()
class CreateCidadeService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {
    //
  }

  public async execute({ nome, email, senha }: IRequestDTO): Promise<Usuario> {
    const usuarioJaExiste = await this.usuariosRepository.findByEmail(email);

    if (usuarioJaExiste) {
      throw new AppError("Endereço de email já utilizado");
    }

    const hashedSenha = await this.hashProvider.generateHash(senha);

    const usuario = await this.usuariosRepository.create({
      nome,
      email,
      senha: hashedSenha,
    });

    return usuario;
  }
}

export default CreateCidadeService;
