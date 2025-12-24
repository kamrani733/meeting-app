import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeetingsTable1766342522154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "meetings",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "scheduleTime",
                        type: "smallint",
                        isNullable: false,
                    },
                    {
                        name: "scheduleDate",
                        type: "datetime",
                        isNullable: false,
                    },
                    {
                        name: "contactMethod",
                        type: "smallint",
                        isNullable: false,
                    },
                    {
                        name: "contactValue",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "purpose",
                        type: "text",
                        isNullable: false,
                        default: "''",
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        isNullable: true,
                        default: null,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("meetings");
    }
}