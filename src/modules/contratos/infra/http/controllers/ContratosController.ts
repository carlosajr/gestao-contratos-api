import CreateContratosService from "@modules/contratos/services/CreateContratoService";
import DeleteContratoService from "@modules/contratos/services/DeleteContratoService";
import IndexContratosService from "@modules/contratos/services/IndexContratosService";
import ShowContratoService from "@modules/contratos/services/ShowContratosService";
import UpdateContratoService from "@modules/contratos/services/UpdateContratoService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ContratosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { prestador_id, servico_prestado, data_inicio, data_fim } =
      request.body;

    const createContrato = container.resolve(CreateContratosService);

    const contrato = await createContrato.execute({
      prestador_id,
      servico_prestado,
      data_inicio,
      data_fim,
    });

    return response.status(201).json(contrato);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexContratosService = container.resolve(IndexContratosService);
    const contratos = await indexContratosService.execute();
    return response.status(200).json(contratos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { contrato_id } = request.params;

    const showContratoService = container.resolve(ShowContratoService);

    const contrato = await showContratoService.execute(contrato_id);

    return response.status(200).json(contrato);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { contrato_id } = request.params;

    const { prestador_id, servico_prestado, data_inicio, data_fim } =
      request.body;

    const updateContratoService = container.resolve(UpdateContratoService);

    const contrato = await updateContratoService.execute({
      contrato_id,
      prestador_id,
      servico_prestado,
      data_inicio,
      data_fim,
    });

    return response.status(200).json(contrato);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { contrato_id } = request.params;

    const deleteContratoService = container.resolve(DeleteContratoService);

    const contratos = await deleteContratoService.execute(contrato_id);

    return response.status(200).json(contratos);
  }
}
