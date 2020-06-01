import {getConnection, MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1589750117262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE user (
                    id  int(11) NOT NULL AUTO_INCREMENT ,
                    username  varchar(255) NOT NULL ,
                    password  varchar(255) NOT NULL ,
                    email  varchar(255) NOT NULL ,
                    role_id  int(11) NOT NULL ,
                    photo  varchar(255) NULL ,
                    created_at  datetime NULL DEFAULT CURRENT_TIMESTAMP ,
                    updated_at  datetime NULL ON UPDATE CURRENT_TIMESTAMP ,
                    deleted_at  datetime NULL ,
                    PRIMARY KEY (id)
                )
                ENGINE=InnoDB
                DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci;
                `
        )



    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`drop table user;`); // reverts things made in "up"
    }

}
