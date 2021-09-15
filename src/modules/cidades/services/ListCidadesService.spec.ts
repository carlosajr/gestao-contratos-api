import FakeCidadesRepository from "@modules/cidades/repositories/fakes/FakeCidadesRepository";
import ListCidadeService from "@modules/cidades/services/ListCidadesService";

describe("ListCidade", () => {
  it("deve permitir listar todas as cidades", async () => {
    const fakeCidadeRepository = new FakeCidadesRepository();
    const listCidades = new ListCidadeService(fakeCidadeRepository);

    const cidades = await listCidades.execute();

    expect(cidades).toBeInstanceOf(Array);
  });
});
