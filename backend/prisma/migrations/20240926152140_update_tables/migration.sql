/*
  Warnings:

  - You are about to drop the `player_apparatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_scores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `level` on the `players` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `player_competitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scoreTypeOfRefereeId` to the `referees` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "player_apparatus_playerId_apparatusId_competitionId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "player_apparatus";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "player_scores";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "player_and_apparatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "apparatusId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_and_apparatus_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_and_apparatus_apparatusId_fkey" FOREIGN KEY ("apparatusId") REFERENCES "apparatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_and_apparatus_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "championships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_scores_by_referee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "score" REAL NOT NULL,
    "playerId" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,
    "apparatusId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_scores_by_referee_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_scores_by_referee_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "referees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_scores_by_referee_apparatusId_fkey" FOREIGN KEY ("apparatusId") REFERENCES "apparatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "player_scores_by_apparatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "apparatusId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "totalScore" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_scores_by_apparatus_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_scores_by_apparatus_apparatusId_fkey" FOREIGN KEY ("apparatusId") REFERENCES "apparatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_scores_by_apparatus_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "championships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player_competitions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competitionId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "totalScore" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "player_competitions_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "championships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_competitions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_competitions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_player_competitions" ("competitionId", "createdAt", "id", "playerId", "totalScore", "updatedAt") SELECT "competitionId", "createdAt", "id", "playerId", "totalScore", "updatedAt" FROM "player_competitions";
DROP TABLE "player_competitions";
ALTER TABLE "new_player_competitions" RENAME TO "player_competitions";
CREATE UNIQUE INDEX "player_competitions_playerId_categoryId_key" ON "player_competitions"("playerId", "categoryId");
CREATE TABLE "new_players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "players_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "players_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_players" ("birthDate", "categoryId", "createdAt", "id", "name", "teamId", "updatedAt") SELECT "birthDate", "categoryId", "createdAt", "id", "name", "teamId", "updatedAt" FROM "players";
DROP TABLE "players";
ALTER TABLE "new_players" RENAME TO "players";
CREATE TABLE "new_referees" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "competitionId" TEXT NOT NULL,
    "scoreTypeOfRefereeId" TEXT NOT NULL,
    CONSTRAINT "referees_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "championships" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "referees_scoreTypeOfRefereeId_fkey" FOREIGN KEY ("scoreTypeOfRefereeId") REFERENCES "score_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_referees" ("competitionId", "createdAt", "email", "id", "name", "phone", "updatedAt") SELECT "competitionId", "createdAt", "email", "id", "name", "phone", "updatedAt" FROM "referees";
DROP TABLE "referees";
ALTER TABLE "new_referees" RENAME TO "referees";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "player_and_apparatus_playerId_apparatusId_competitionId_key" ON "player_and_apparatus"("playerId", "apparatusId", "competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "player_scores_by_apparatus_playerId_apparatusId_competitionId_key" ON "player_scores_by_apparatus"("playerId", "apparatusId", "competitionId");
