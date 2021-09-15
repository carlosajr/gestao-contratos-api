import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateContrato1621886263318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contratos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "prestador_id",
            type: "uuid",
          },
          {
            name: "servico_prestado",
            type: "varchar",
          },
          {
            name: "data_inicio",
            type: "timestamp",
          },
          {
            name: "data_fim",
            type: "timestamp",
          },
          {
            name: "ativo",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "contratos",
      new TableForeignKey({
        name: "ContratoPrestador",
        columnNames: ["prestador_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "prestadores",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("contratos", "ContratoPrestador");

    await queryRunner.dropTable("contratos");
  }
}
