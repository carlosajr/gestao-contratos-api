import CountContratosPorPrazoService from "@modules/contratos/services/CountContratosPorPrazoService";
import ListContratosPorPrazoService from "@modules/contratos/services/ListContratosPorPrazoService";
import ShowPrazoRestanteContratoService from "@modules/contratos/services/ShowPrazoRestanteContratoService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ContratosFilterController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { prazo } = request.params;

    const prazoInt = parseInt(prazo, 10);

    const listContrato = container.resolve(ListContratosPorPrazoService);

    const contratos = await listContrato.execute(prazoInt);

    return response.status(201).json(contratos);
  }

  public async count(request: Request, response: Response): Promise<Response> {
    const { prazo } = request.params;

    const prazoInt = parseInt(prazo, 10);

    const countContrato = container.resolve(CountContratosPorPrazoService);

    const nContratos = await countContrato.execute(prazoInt);

    return response.status(201).json(nContratos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { contrato_id } = request.params;

    const showPrazo = container.resolve(ShowPrazoRestanteContratoService);

    const diasRestantes = await showPrazo.execute(contrato_id);

    return response.status(201).json(diasRestantes);
  }
}
