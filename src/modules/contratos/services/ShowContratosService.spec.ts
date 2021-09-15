import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import FakeContratosRepository from "@modules/contratos/repositories/fakes/FakeContratosRepository";
import CreateContratoService from "@modules/contratos/services/CreateContratoService";
import ShowContratosService from "@modules/contratos/services/ShowContratosService";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("ShowContrato", () => {
  it("deve permitir exibir o contrato", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const createContrato = new CreateContratoService(
      fakeContratoRepository,
      fakePrestadorRepository
    );
    const showContratosService = new ShowContratosService(
      fakeContratoRepository
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

    const contrato = await createContrato.execute({
      prestador_id: prestador.id,
      servico_prestado: "Desenvolvimento de Sistema",
      data_inicio: new Date(),
      data_fim: new Date(),
    });

    const contratoShow = await showContratosService.execute(contrato.id);

    expect(contratoShow).toBeInstanceOf(Contrato);
    expect(contratoShow).toHaveProperty("id");
  });

  it("não deve permitir exibir o contrato com id errado", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const showContratosService = new ShowContratosService(
      fakeContratoRepository
    );

    const idErrado = "443878cc-4309-47c4-825e-496ed3816931";

    expect(showContratosService.execute(idErrado)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
