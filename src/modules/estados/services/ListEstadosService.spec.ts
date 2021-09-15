import FakeEstadoRepository from "@modules/estados/repositories/fakes/FakeEstadoRepository";
import ListEstadosService from "@modules/estados/services/ListEstadosService";

describe("ListEstado", () => {
  it("deve permitir listar todos os estados", async () => {
    const fakeEstadoRepository = new FakeEstadoRepository();
    const listEstados = new ListEstadosService(fakeEstadoRepository);

    const estados = await listEstados.execute();

    expect(estados).toBeInstanceOf(Array);
  });
});
