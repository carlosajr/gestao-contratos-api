import AuthenticateUsuarioService from "@modules/usuarios/services/AuthenticateUsuarioService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;

    const authenticateUsuario = container.resolve(AuthenticateUsuarioService);

    const { usuario, token } = await authenticateUsuario.execute({
      email,
      senha,
    });

    return response.json({ usuario: classToClass(usuario), token });
  }
}
