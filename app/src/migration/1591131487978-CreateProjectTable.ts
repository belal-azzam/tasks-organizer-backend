import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProjectTable1591131487978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `
            CREATE TABLE project (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                description text,
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                updated_at datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                deleted_at datetime DEFAULT NULL ,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table project;`); // reverts things made in "up"
    }

}
