import IUpdatePrestadorDTO from "@modules/prestadores/dtos/IUpdatePrestadorDTO";
import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadoresRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppErrors";

@injectable()
class UpdatePrestadorService {
  constructor(
    @inject("PrestadoresRepository")
    private prestadoresRepository: IPrestadoresRepository
  ) {
    //
  }

  public async execute(dataPrestador: IUpdatePrestadorDTO): Promise<Prestador> {
    const prestador = await this.prestadoresRepository.findById(
      dataPrestador.prestador_id
    );

    if (!prestador) {
      throw new AppError("Prestador não encontrado");
    }

    const prestadorComEmailInformado =
      await this.prestadoresRepository.findByEmail(dataPrestador.email);

    if (
      prestadorComEmailInformado &&
      prestadorComEmailInformado.id !== prestador.id
    ) {
      throw new AppError(
        "Este email já está sendo utilizado por outro prestador"
      );
    }

    prestador.nome = dataPrestador.nome;
    prestador.email = dataPrestador.email;
    prestador.cep = dataPrestador.cep;
    prestador.endereco = dataPrestador.endereco;
    prestador.numero = dataPrestador.numero;
    prestador.complemento = dataPrestador.complemento;
    prestador.bairro = dataPrestador.bairro;
    prestador.cidade = dataPrestador.cidade;
    prestador.estado = dataPrestador.estado;

    return this.prestadoresRepository.update(prestador);
  }
}

export default UpdatePrestadorService;
