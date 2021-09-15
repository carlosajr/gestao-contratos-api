import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import FakeUsuarioRepository from "@modules/usuarios/repositories/fakes/FakeUsuarioRepository";
import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";

import AppError from "@shared/errors/AppErrors";

import FakeHashProvider from "../providers/fakes/FakeHashProvider";

describe("CreateUsuario", () => {
  it("deve permitir criar um novo usuario", async () => {
    const fakeUsuarioRepository = new FakeUsuarioRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsuario = new CreateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );

    const usuario = await createUsuario.execute({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "123456789",
    });

    expect(usuario).toBeInstanceOf(Usuario);
    expect(usuario).toHaveProperty("id");
    expect(usuario.email).toBe("fulano@gmail.com");
  });

  it("não deve permitir criar uma nova cidade com um codigo já existente", async () => {
    const fakeUsuarioRepository = new FakeUsuarioRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsuario = new CreateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );

    await createUsuario.execute({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "123456789",
    });

    expect(
      createUsuario.execute({
        nome: "Siclano",
        email: "fulano@gmail.com",
        senha: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
