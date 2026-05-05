/*
  Warnings:

  - A unique constraint covering the columns `[url,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Bookmark_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_url_userId_key" ON "Bookmark"("url", "userId");
