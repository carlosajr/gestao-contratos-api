import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEstados1621871119965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "estados",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "codigo",
            type: "integer",
            isUnique: true,
          },
          {
            name: "sigla",
            type: "varchar",
          },
          {
            name: "nome",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("estados");
  }
}
