/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
