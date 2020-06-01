import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoleTable1589751406405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE role (
                        id  int NOT NULL AUTO_INCREMENT ,
                        name  varchar(255) NOT NULL ,
                        can_be_edited  tinyint NOT NULL DEFAULT 1 ,
                        description  text NULL ,
                        created_at  datetime NULL DEFAULT CURRENT_TIMESTAMP ,
                        updated_at  datetime NULL ON UPDATE CURRENT_TIMESTAMP ,
                        deleted_at  datetime NULL ,
                    PRIMARY KEY (id)
                    )
                    ENGINE=InnoDB
                    DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;
`
        );

        await queryRunner.query(
            `insert into role (id,name,can_be_edited) VALUES (1,'owner', 0),(2,'guest', 1)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table role;`); // reverts things made in "up"
    }

}
