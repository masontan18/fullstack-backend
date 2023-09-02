-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "price" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
