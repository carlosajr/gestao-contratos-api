import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";
import DeletePrestadorService from "@modules/prestadores/services/DeletePrestadorService";
import IndexPrestadorService from "@modules/prestadores/services/IndexPrestadorService";
import ShowPrestadorsService from "@modules/prestadores/services/ShowPrestadorService";
import UpdatePrestadorService from "@modules/prestadores/services/UpdatePrestadorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class PrestadoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      tipo_pessoa,
      cpf_cnpj,
      nome,
      email,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    } = request.body;

    const createPrestador = container.resolve(CreatePrestadorService);

    const prestador = await createPrestador.execute({
      tipo_pessoa,
      cpf_cnpj,
      nome,
      email,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    });

    return response.status(201).json(prestador);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexPrestadorService = container.resolve(IndexPrestadorService);
    const cidades = await indexPrestadorService.execute();
    return response.status(200).json(cidades);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { prestador_id } = request.params;

    const showPrestadorsService = container.resolve(ShowPrestadorsService);

    const prestador = await showPrestadorsService.execute(prestador_id);

    return response.status(200).json(prestador);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { prestador_id } = request.params;

    const {
      tipo_pessoa,
      cpf_cnpj,
      nome,
      email,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    } = request.body;

    const updatePrestadorsService = container.resolve(UpdatePrestadorService);

    const prestador = await updatePrestadorsService.execute({
      prestador_id,
      tipo_pessoa,
      cpf_cnpj,
      nome,
      email,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    });

    return response.status(200).json(prestador);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { prestador_id } = request.params;

    const deletePrestadorService = container.resolve(DeletePrestadorService);

    const cidades = await deletePrestadorService.execute(prestador_id);

    return response.status(200).json(cidades);
  }
}
