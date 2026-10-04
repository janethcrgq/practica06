/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `inscripciones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inscripciones` DROP COLUMN `creadoEn`,
    ADD COLUMN `creadaEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
