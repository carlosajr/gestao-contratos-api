import Contrato from "@modules/contratos/infra/typeorm/entities/Contrato";
import FakeContratosRepository from "@modules/contratos/repositories/fakes/FakeContratosRepository";
import CreateContratoService from "@modules/contratos/services/CreateContratoService";
import UpdateContratoService from "@modules/contratos/services/UpdateContratoService";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("UpdatePrestador", () => {
  it("deve permitir atualizar um contrato", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const createContrato = new CreateContratoService(
      fakeContratoRepository,
      fakePrestadorRepository
    );
    const updateContrato = new UpdateContratoService(fakeContratoRepository);

    const prestador = await createPrestador.execute({
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

    const contrato = await createContrato.execute({
      prestador_id: prestador.id,
      servico_prestado: "Desenvolvimento de Sistema",
      data_inicio: new Date(),
      data_fim: new Date(),
    });

    const contratoParaAtualziar = {
      contrato_id: contrato.id,
      prestador_id: "87e22580-ea66-497b-a84e-2e08b0bee247",
      servico_prestado: "Desenvolvimento de Sistema em Node",
      data_inicio: new Date(),
      data_fim: new Date(),
    };

    const contratoAtualizado = await updateContrato.execute(
      contratoParaAtualziar
    );

    expect(contratoAtualizado).toBeInstanceOf(Contrato);
    expect(contratoAtualizado.servico_prestado).toBe(
      "Desenvolvimento de Sistema em Node"
    );
  });

  it("não deve permitir atualizar um contrato com id errado", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const updateContrato = new UpdateContratoService(fakeContratoRepository);

    const contratoParaAtualziar = {
      contrato_id: "87e22580-ea66-497b-a84e-2e08b0bee247",
      prestador_id: "87e22580-ea66-497b-a84e-2e08b0bee247",
      servico_prestado: "Desenvolvimento de Sistema em Node",
      data_inicio: new Date(),
      data_fim: new Date(),
    };

    expect(
      updateContrato.execute(contratoParaAtualziar)
    ).rejects.toBeInstanceOf(AppError);
  });
});
