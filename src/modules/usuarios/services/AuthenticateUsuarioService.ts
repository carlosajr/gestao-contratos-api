import "dotenv/config";
import authConfig from "@config/auth";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IHashProvider from "@modules/usuarios/providers/models/IHashProvider";
import IUsuarioRepository from "@modules/usuarios/repositories/IUsuarioRepository";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

interface IRequestDTO {
  email: string;
  senha: string;
}

interface IResponseDTO {
  usuario: Usuario;
  token: string;
}

@injectable()
class AuthenticateUsuarioService {
  constructor(
    @inject("UsuariosRepository")
    private usuariosRepository: IUsuarioRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {
    //
  }

  public async execute({ email, senha }: IRequestDTO): Promise<IResponseDTO> {
    const usuario = await this.usuariosRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError("Email ou senha invalidos", 401);
    }

    const senhaCorreta = await this.hashProvider.comapreHash(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      throw new AppError("Email ou senha invalidos", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    console.log(secret, expiresIn);
    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });

    return {
      usuario,
      token,
    };
  }
}

export default AuthenticateUsuarioService;
