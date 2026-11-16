/*
  Warnings:

  - You are about to drop the column `madiaType` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "madiaType",
ADD COLUMN     "mediaType" "MenuMediaType" NOT NULL DEFAULT 'IMAGE';
