import FakeCidadesRepository from "@modules/cidades/repositories/fakes/FakeCidadesRepository";
import ListCidadesPorEstadoService from "@modules/estados/services/ListCidadesPorEstadoService";

describe("ListCidadesPorEstadoService", () => {
  it("deve permitir listar todas as cidades de um estado", async () => {
    const fakeCidadeRepository = new FakeCidadesRepository();
    const listCidadesPorEstadoService = new ListCidadesPorEstadoService(
      fakeCidadeRepository
    );

    const codigo_estado = 100125;
    const cidades = await listCidadesPorEstadoService.execute({
      codigo_estado,
    });

    expect(cidades).toBeInstanceOf(Array);
  });
});
