import { Connection, createConnection } from "typeorm";

export default class DataBase {
  public async conecta(): Promise<Connection> {
    const connection = await createConnection();
    return connection;
  }
}
