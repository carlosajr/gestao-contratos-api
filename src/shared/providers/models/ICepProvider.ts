import ICepDTO from "@shared/dtos/ICepDTO";

export default interface ICepProvider {
  consultarCep(payload: string): Promise<ICepDTO>;
}
