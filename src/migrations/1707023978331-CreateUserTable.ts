/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1707023978331 implements MigrationInterface {
    name = 'CreateUserTable1707023978331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."connection_connection_status_enum" AS ENUM('followed', 'connected', 'pending')`);
        await queryRunner.query(`CREATE TABLE "connection" ("connection_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "username" character varying NOT NULL, "connection_user_id" integer NOT NULL, "connection_status" "public"."connection_connection_status_enum" NOT NULL, "userId" integer, CONSTRAINT "PK_b982c0f70fc2edbe59652f2c406" PRIMARY KEY ("connection_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('m', 'f', 't')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(26) NOT NULL, "username" character varying(15) NOT NULL, "email" character varying(40) NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "phoneNumber" character varying(15), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connection" ADD CONSTRAINT "FK_3b35155c2968acced66fc326aea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "connection" DROP CONSTRAINT "FK_3b35155c2968acced66fc326aea"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "connection"`);
        await queryRunner.query(`DROP TYPE "public"."connection_connection_status_enum"`);
    }

}
