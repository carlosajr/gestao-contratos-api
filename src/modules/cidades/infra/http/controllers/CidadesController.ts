import ListCidadesService from "@modules/cidades/services/ListCidadesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CidadesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCidadesService = container.resolve(ListCidadesService);

    const cidades = await listCidadesService.execute();

    return response.status(200).json(cidades);
  }
}
