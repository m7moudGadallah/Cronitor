/*
  Warnings:

  - Added the required column `normalizedName` to the `MonitoredUrl` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonitoredUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "interval" TEXT NOT NULL DEFAULT '* * * * *',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MonitoredUrl" ("createdAt", "id", "interval", "isActive", "name", "updatedAt", "url") SELECT "createdAt", "id", "interval", "isActive", "name", "updatedAt", "url" FROM "MonitoredUrl";
DROP TABLE "MonitoredUrl";
ALTER TABLE "new_MonitoredUrl" RENAME TO "MonitoredUrl";
CREATE UNIQUE INDEX "MonitoredUrl_url_key" ON "MonitoredUrl"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
