import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";
import DeletePrestadorService from "@modules/prestadores/services/DeletePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("DeletePrestador", () => {
  it("deve permitir deletar um prestador", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const deletePrestador = new DeletePrestadorService(fakePrestadorRepository);

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

    const prestadorDeletado = await deletePrestador.execute(prestador.id);

    expect(prestadorDeletado.ativo).toBe(false);
  });

  it("não deve permitir deletar um prestador com id incorreto", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const deletePrestador = new DeletePrestadorService(fakePrestadorRepository);

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

    const idErrado = "448b3e42-d03f-42c2-9ec4-b68e7023a50E";

    expect(deletePrestador.execute(idErrado)).rejects.toBeInstanceOf(AppError);
  });
});
