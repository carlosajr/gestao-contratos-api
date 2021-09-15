import ICreatePrestadorDTO from "@modules/prestadores/dtos/ICreatePrestadorDTO";
import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import IPrestadorRepository from "@modules/prestadores/repositories/IPrestadoresRepository";
import { v4 as uuid } from "uuid";

class PrestadorRepository implements IPrestadorRepository {
  private prestadores: Prestador[] = [];

  public async create({
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
  }: ICreatePrestadorDTO): Promise<Prestador> {
    const prestador = new Prestador();

    Object.assign(prestador, {
      id: uuid(),
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

    this.prestadores.push(prestador);

    return prestador;
  }

  public async index(): Promise<Prestador[]> {
    const prestadoresAtivos: Prestador[] = [];

    this.prestadores.forEach(function (prestador) {
      if (prestador.ativo === true) prestadoresAtivos.push(prestador);
    });

    return prestadoresAtivos;
  }

  public async show(id: string): Promise<Prestador | undefined> {
    const findPrestador = this.prestadores.find(
      (prestador) => prestador.id === id
    );

    return findPrestador;
  }

  public async update(prestador: Prestador): Promise<Prestador> {
    const index = this.prestadores.findIndex(
      (prestadorInBD) => prestadorInBD.id === prestador.id
    );

    this.prestadores[index] = prestador;

    return this.prestadores[index];
  }

  public async findById(id: string): Promise<Prestador | undefined> {
    const findPrestador = this.prestadores.find(
      (prestador) => prestador.id === id
    );

    return findPrestador;
  }

  public async findByCpf_cnpj(
    cpf_cnpj: string
  ): Promise<Prestador | undefined> {
    const findPrestador = this.prestadores.find(
      (prestador) => prestador.cpf_cnpj === cpf_cnpj
    );

    return findPrestador;
  }

  public async findByEmail(email: string): Promise<Prestador | undefined> {
    const findPrestador = this.prestadores.find(
      (prestador) => prestador.email === email
    );

    return findPrestador;
  }
}

export default PrestadorRepository;
