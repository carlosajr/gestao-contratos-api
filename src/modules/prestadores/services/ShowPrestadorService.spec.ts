import Prestador from "@modules/prestadores/infra/typeorm/entities/Prestador";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";
import ShowPrestadorService from "@modules/prestadores/services/ShowPrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("ShowPrestador", () => {
  it("deve permitir exibir o prestador", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const showPrestadorService = new ShowPrestadorService(
      fakePrestadorRepository
    );

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

    const prestadorShow = await showPrestadorService.execute(prestador.id);

    expect(prestadorShow).toBeInstanceOf(Prestador);
    expect(prestadorShow).toHaveProperty("id");
  });

  it("não deve permitir exibir o prestador com id errado", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const showPrestadorService = new ShowPrestadorService(
      fakePrestadorRepository
    );

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

    const idErrado = "443878cc-4309-47c4-825e-496ed3816931";

    expect(showPrestadorService.execute(idErrado)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
