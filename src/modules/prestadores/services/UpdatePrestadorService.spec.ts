import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";
import UpdatePrestadorService from "@modules/prestadores/services/UpdatePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("UpdatePrestador", () => {
  it("deve permitir atualizar um prestador", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const updatePrestador = new UpdatePrestadorService(fakePrestadorRepository);

    const prestador = await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia",
      email: "victormaia@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    const prestadorParaAtualziar = {
      prestador_id: prestador.id,
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia de Almeida",
      email: "victormaia@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    };

    const prestadorAtualizado = await updatePrestador.execute(
      prestadorParaAtualziar
    );

    expect(prestadorAtualizado).toBeInstanceOf(Prestador);
    expect(prestadorAtualizado.nome).toBe("Victor Maia de Almeida");
  });

  it("não deve permitir atualizar um prestador com id errado", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const updatePrestador = new UpdatePrestadorService(fakePrestadorRepository);

    await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia",
      email: "victormaia@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    const prestadorParaAtualziar = {
      prestador_id: "443878cc-4309-47c4-825e-496ed3816931",
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia de Almeida",
      email: "victormaia@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    };

    expect(
      updatePrestador.execute(prestadorParaAtualziar)
    ).rejects.toBeInstanceOf(AppError);
  });

  it("não deve permitir atualizar um prestador com id errado", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const updatePrestador = new UpdatePrestadorService(fakePrestadorRepository);

    const prestador = await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia",
      email: "victormaia@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "22222222222",
      nome: "Victor Maia",
      email: "victormaia2@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    const prestadorParaAtualziar = {
      prestador_id: prestador.id,
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia de Almeida",
      email: "victormaia2@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    };

    expect(
      updatePrestador.execute(prestadorParaAtualziar)
    ).rejects.toBeInstanceOf(AppError);
  });
});
