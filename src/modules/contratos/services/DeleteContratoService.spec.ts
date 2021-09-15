import FakeContratosRepository from "@modules/contratos/repositories/fakes/FakeContratosRepository";
import CreateContratoService from "@modules/contratos/services/CreateContratoService";
import DeleteContratoService from "@modules/contratos/services/DeleteContratoService";
import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import CreatePrestadorService from "@modules/prestadores/services/CreatePrestadorService";

import AppError from "@shared/errors/AppErrors";

describe("DeleteContrato", () => {
  it("deve permitir deletar um contrato", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const fakePrestadorRepository = new FakePrestadorRepository();
    const createPrestador = new CreatePrestadorService(fakePrestadorRepository);
    const createContrato = new CreateContratoService(
      fakeContratoRepository,
      fakePrestadorRepository
    );
    const deleteContrato = new DeleteContratoService(fakeContratoRepository);

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

    const contratoDeletado = await deleteContrato.execute(contrato.id);

    expect(contratoDeletado.ativo).toBe(false);
  });

  it("não deve permitir deletar um prestador com id incorreto", async () => {
    const fakeContratoRepository = new FakeContratosRepository();
    const deleteContrato = new DeleteContratoService(fakeContratoRepository);

    const idErrado = "448b3e42-d03f-42c2-9ec4-b68e7023a50E";

    expect(deleteContrato.execute(idErrado)).rejects.toBeInstanceOf(AppError);
  });
});
