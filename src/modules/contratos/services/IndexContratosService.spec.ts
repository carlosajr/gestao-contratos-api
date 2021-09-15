import FakeContratosRepository from "@modules/contratos/repositories/fakes/FakeContratosRepository";
import IndexContratosService from "@modules/contratos/services/IndexContratosService";

describe("IndexContratos", () => {
  it("deve permitir exibir os contratos", async () => {
    const fakeContratosRepository = new FakeContratosRepository();
    const indexPrestadorService = new IndexContratosService(
      fakeContratosRepository
    );

    const contratos = await indexPrestadorService.execute();

    expect(contratos).toBeInstanceOf(Array);
  });
});
