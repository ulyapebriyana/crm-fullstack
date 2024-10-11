/*
  Warnings:

  - The `zipCode` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "note" TEXT,
DROP COLUMN "zipCode",
ADD COLUMN     "zipCode" INTEGER;
