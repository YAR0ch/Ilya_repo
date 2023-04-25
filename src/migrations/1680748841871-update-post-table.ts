import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable1680748841871 implements MigrationInterface {
  name = 'updatePostTable1680748841871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "words" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "group" integer NOT NULL, "page" integer NOT NULL, "word" character varying NOT NULL, "wordTranslate" character varying NOT NULL, "transcription" character varying NOT NULL, "image" character varying NOT NULL, "audio" character varying NOT NULL, "audioMeaning" character varying NOT NULL, "audioExample" character varying NOT NULL, "textMeaning" character varying NOT NULL, "textMeaningTranslate" character varying NOT NULL, "textExample" character varying NOT NULL, "textExampleTranslate" character varying NOT NULL, "difficult" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, "correct" integer NOT NULL DEFAULT '0', "fail" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "soundVolume" integer NOT NULL DEFAULT '0', "musicVolume" integer NOT NULL DEFAULT '0', "wordVolume" integer NOT NULL DEFAULT '50', "difficultWord" boolean NOT NULL DEFAULT true, "deleteWord" boolean NOT NULL DEFAULT true, "translateWord" boolean NOT NULL DEFAULT true, "translateSentences" boolean NOT NULL DEFAULT true, "theme" character varying NOT NULL DEFAULT 'dark', CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "statistics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "gameName" character varying NOT NULL, "totalWords" integer NOT NULL, "correctPercent" integer NOT NULL, "longestSeries" integer NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT 'Енотик', "email" character varying NOT NULL, "password" character varying NOT NULL, "avatarUrl" character varying NOT NULL DEFAULT 'http://res.cloudinary.com/nazdac/image/upload/v1616652013/travelAppFolder/dmlfcuvyr79gpkbgg639.jpg', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "userWords" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "group" integer NOT NULL, "page" integer NOT NULL, "word" character varying NOT NULL, "wordTranslate" character varying NOT NULL, "transcription" character varying NOT NULL, "image" character varying NOT NULL, "audio" character varying NOT NULL, "audioMeaning" character varying NOT NULL, "audioExample" character varying NOT NULL, "textMeaning" character varying NOT NULL, "textMeaningTranslate" character varying NOT NULL, "textExample" character varying NOT NULL, "textExampleTranslate" character varying NOT NULL, "difficult" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, "correct" integer NOT NULL DEFAULT '0', "fail" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_829ead6b115242c16c33b4a2565" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "userWords"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "statistics"`);
    await queryRunner.query(`DROP TABLE "settings"`);
    await queryRunner.query(`DROP TABLE "words"`);
  }
}
