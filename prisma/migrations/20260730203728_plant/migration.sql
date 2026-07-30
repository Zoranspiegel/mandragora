/*
  Warnings:

  - Added the required column `location_type` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Made the column `location_place` on table `Plant` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('INTERIOR', 'EXTERIOR');

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "location_type",
ADD COLUMN     "location_type" "LocationType" NOT NULL,
ALTER COLUMN "location_place" SET NOT NULL;
