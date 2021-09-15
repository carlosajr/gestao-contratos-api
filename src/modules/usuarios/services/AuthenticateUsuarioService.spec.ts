import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import FakeUsuarioRepository from "@modules/usuarios/repositories/fakes/FakeUsuarioRepository";
import AuthenticateUsuarioService from "@modules/usuarios/services/AuthenticateUsuarioService";
import CreateUsuarioService from "@modules/usuarios/services/CreateUsuarioService";

import AppError from "@shared/errors/AppErrors";

import FakeHashProvider from "../providers/fakes/FakeHashProvider";

describe("CreateUsuario", () => {
  it("deve permitir Autenticar o Usuario", async () => {
    const fakeUsuarioRepository = new FakeUsuarioRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsuario = new CreateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );

    await createUsuario.execute({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "123456789",
    });

    const response = await authenticateUsuario.execute({
      email: "fulano@gmail.com",
      senha: "123456789",
    });

    expect(response.usuario).toBeInstanceOf(Usuario);
    expect(response).toHaveProperty("token");
  });

  it("não deve permitir Autenticar o usuario com email incorreto", async () => {
    const fakeUsuarioRepository = new FakeUsuarioRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsuario = new CreateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );

    await createUsuario.execute({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "123456789",
    });

    expect(
      authenticateUsuario.execute({
        email: "siclano@gmail.com",
        senha: "123456789",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("não deve permitir Autenticar o usuario com senha incorreta", async () => {
    const fakeUsuarioRepository = new FakeUsuarioRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsuario = new CreateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );
    const authenticateUsuario = new AuthenticateUsuarioService(
      fakeUsuarioRepository,
      fakeHashProvider
    );

    await createUsuario.execute({
      nome: "Fulano",
      email: "fulano@gmail.com",
      senha: "1111123456789",
    });

    expect(
      authenticateUsuario.execute({
        email: "fulano@gmail.com",
        senha: "123456789",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
