import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1698696805234 implements MigrationInterface {
    name = 'InitialMigration1698696805234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "image_url" character varying(200) NOT NULL, "anouncementId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "description" text NOT NULL, "created_at" date NOT NULL DEFAULT now(), "anouncementId" integer, "userId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anouncements" ("id" SERIAL NOT NULL, "brand" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" integer NOT NULL, "fuel" character varying(50) NOT NULL, "mileage" double precision NOT NULL, "color" character varying(50) NOT NULL, "price_fipe" double precision NOT NULL, "price" double precision NOT NULL, "description" text, "cover_image" character varying(200) NOT NULL, "userId" integer, CONSTRAINT "PK_c96a8cc85ae35a5f59b0eb0d272" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_account_enum" AS ENUM('Customer', 'Advertiser')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "cpf" character varying NOT NULL, "tel" character varying(100) NOT NULL, "birth" date NOT NULL, "password" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, "account" "public"."users_account_enum" NOT NULL DEFAULT 'Advertiser', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "zip_code" character varying(9) NOT NULL, "state" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL, "number" character varying(20), "complement" text, "userId" integer, CONSTRAINT "REL_b4f5c94493f23641866f161e21" UNIQUE ("userId"), CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_55c1eee70dc5c5b6e62c37cfe99" FOREIGN KEY ("anouncementId") REFERENCES "anouncements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anouncements" ADD CONSTRAINT "FK_e267ed4442b36dddaff4b9f1986" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "anouncements" DROP CONSTRAINT "FK_e267ed4442b36dddaff4b9f1986"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_55c1eee70dc5c5b6e62c37cfe99"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_019275b0b62c3f8b98e66c6d79c"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_account_enum"`);
        await queryRunner.query(`DROP TABLE "anouncements"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
