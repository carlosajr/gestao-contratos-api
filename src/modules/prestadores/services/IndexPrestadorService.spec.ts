import FakePrestadorRepository from "@modules/prestadores/repositories/fakes/FakePrestadorRepository";
import IndexPrestadorService from "@modules/prestadores/services/IndexPrestadorService";

describe("IndexPrestador", () => {
  it("deve permitir exibir os prestador", async () => {
    const fakePrestadorRepository = new FakePrestadorRepository();
    const indexPrestadorService = new IndexPrestadorService(
      fakePrestadorRepository
    );

    const prestadores = await indexPrestadorService.execute();

    expect(prestadores).toBeInstanceOf(Array);
  });
});
