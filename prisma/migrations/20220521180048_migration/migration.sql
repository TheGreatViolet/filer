/*
  Warnings:

  - You are about to drop the column `favorite` on the `File` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "size" INTEGER NOT NULL
);
INSERT INTO "new_File" ("ext", "id", "name", "size") SELECT "ext", "id", "name", "size" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
