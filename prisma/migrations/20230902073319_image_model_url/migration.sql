/*
  Warnings:

  - You are about to drop the column `password` on the `Image` table. All the data in the column will be lost.
  - Added the required column `description` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "password",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
