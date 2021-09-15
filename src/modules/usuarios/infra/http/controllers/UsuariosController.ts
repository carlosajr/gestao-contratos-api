import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha } = request.body;

    const createUsuario = container.resolve(CreateUsuarioService);

    const usuario = await createUsuario.execute({
      nome,
      email,
      senha,
    });

    return response.status(201).json({ usuario: classToClass(usuario) });
  }
}
