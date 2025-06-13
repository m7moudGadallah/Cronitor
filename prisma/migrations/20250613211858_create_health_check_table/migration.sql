-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlId" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HealthCheck_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "MonitoredUrl" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
