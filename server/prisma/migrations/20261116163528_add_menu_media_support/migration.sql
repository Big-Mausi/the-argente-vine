/*
  Warnings:

  - You are about to drop the column `image` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `imagePublicId` on the `MenuItem` table. All the data in the column will be lost.
  - Added the required column `mediaUrl` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MenuMediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "image",
DROP COLUMN "imagePublicId",
ADD COLUMN     "madiaType" "MenuMediaType" NOT NULL DEFAULT 'IMAGE',
ADD COLUMN     "mediaPublicId" TEXT,
ADD COLUMN     "mediaUrl" TEXT NOT NULL;
