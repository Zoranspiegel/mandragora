/*
  Warnings:

  - Made the column `next_watering` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Plant" ALTER COLUMN "next_watering" SET NOT NULL;
