import { Request, Response } from "express";
import { container } from "tsyringe";

import ConsultarCepService from "@shared/services/ConsultarCepService";

export default class PrestadoresController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { cep } = request.params;

    const consultarCepService = container.resolve(ConsultarCepService);

    const prestador = await consultarCepService.execute(cep);

    return response.status(200).json(prestador);
  }
}
