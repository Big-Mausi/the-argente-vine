/*
  Warnings:

  - Added the required column `imagePublicId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "imagePublicId" TEXT NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "MenuItem_category_idx" ON "MenuItem"("category");

-- CreateIndex
CREATE INDEX "MenuItem_isAvailable_idx" ON "MenuItem"("isAvailable");

-- CreateIndex
CREATE INDEX "MenuItem_sortOrder_idx" ON "MenuItem"("sortOrder");
