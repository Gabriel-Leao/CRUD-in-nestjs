/*
  Warnings:

  - You are about to drop the column `autor` on the `books` table. All the data in the column will be lost.
  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "barCode" TEXT NOT NULL
);
INSERT INTO "new_books" ("barCode", "description", "id", "releaseYear", "title") SELECT "barCode", "description", "id", "releaseYear", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_barCode_key" ON "books"("barCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
