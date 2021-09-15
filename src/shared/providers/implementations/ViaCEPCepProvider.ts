import axios from "axios";

import ICepDTO from "@shared/dtos/ICepDTO";
import AppError from "@shared/errors/AppErrors";
import ICepProvider from "@shared/providers/models/ICepProvider";

export default class ViaCEPCepProvider implements ICepProvider {
  public async consultarCep(payload: string): Promise<ICepDTO> {
    const api = axios.create({
      baseURL: "https://viacep.com.br/",
    });

    try {
      const response = await api.get(`ws/${payload}/json/`);

      return response.data;
    } catch {
      throw new AppError("Erro ao consultar CEP");
    }
  }
}
