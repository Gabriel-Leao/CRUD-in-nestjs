-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "barCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "books_barCode_key" ON "books"("barCode");
