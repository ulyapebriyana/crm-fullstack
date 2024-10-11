/*
  Warnings:

  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "state",
ADD COLUMN     "province" TEXT;
