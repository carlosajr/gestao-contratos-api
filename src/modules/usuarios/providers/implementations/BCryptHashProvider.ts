import IHashProvider from "@modules/usuarios/providers/models/IHashProvider";
import { hash, compare } from "bcryptjs";

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public comapreHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
