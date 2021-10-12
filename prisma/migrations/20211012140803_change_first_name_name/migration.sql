/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "githubUsername" DROP NOT NULL;
