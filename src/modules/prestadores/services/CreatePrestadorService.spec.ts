import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("CreatePrestador", () => {
  it("deve permitir criar um novo prestador", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);

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

    expect(prestador).toBeInstanceOf(Prestador);
    expect(prestador).toHaveProperty("id");
    expect(prestador.cpf_cnpj).toBe("11111111111");
  });

  it("não deve permitir criar um novo prestador com mesmo cpf ou cnpj", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);

    await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia",
      email: "email@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    expect(
      createPrestador.execute({
        tipo_pessoa: "pf",
        cpf_cnpj: "11111111111",
        nome: "Victor Maia",
        email: "emaildiferentea@gmail.com",
        cep: "58064370",
        endereco: "Rua lauro",
        numero: 60,
        complemento: "Casa amarela",
        bairro: "Valentina 1",
        cidade: "443878cc-4309-47c4-825e-496ed3816931",
        estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("não deve permitir criar um novo prestador com mesmo email", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);

    await createPrestador.execute({
      tipo_pessoa: "pf",
      cpf_cnpj: "11111111111",
      nome: "Victor Maia",
      email: "email@gmail.com",
      cep: "58064370",
      endereco: "Rua lauro",
      numero: 60,
      complemento: "Casa amarela",
      bairro: "Valentina 1",
      cidade: "443878cc-4309-47c4-825e-496ed3816931",
      estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
    });

    expect(
      createPrestador.execute({
        tipo_pessoa: "pf",
        cpf_cnpj: "22222222222",
        nome: "Victor Maia",
        email: "email@gmail.com",
        cep: "58064370",
        endereco: "Rua lauro",
        numero: 60,
        complemento: "Casa amarela",
        bairro: "Valentina 1",
        cidade: "443878cc-4309-47c4-825e-496ed3816931",
        estado: "448b3e42-d03f-42c2-9ec4-b68e7023a50b",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
