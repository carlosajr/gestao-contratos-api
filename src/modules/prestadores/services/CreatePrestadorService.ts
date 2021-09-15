import ICreatePrestadorDTO from "@modules/prestadores/dtos/ICreatePrestadorDTO";
import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class CreatePrestadorService {
  constructor(
    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(dataPrestador: ICreatePrestadorDTO): Promise<Prestador> {
    const prestadorJaRegistrado =
      await this.prestadoresRepository.findByCpf_cnpj(dataPrestador.cpf_cnpj);

    if (prestadorJaRegistrado) {
      throw new AppError("Já existe um prestador com esse CPF ou CNPJ");
    }

    const jaExistePrestadorComEmail =
      await this.prestadoresRepository.findByEmail(dataPrestador.email);

    if (jaExistePrestadorComEmail) {
      throw new AppError(
        "Este email já está sendo utilizado por outro prestador"
      );
    }

    const prestador = await this.prestadoresRepository.create(dataPrestador);

    return prestador;
  }
}

export default CreatePrestadorService;
