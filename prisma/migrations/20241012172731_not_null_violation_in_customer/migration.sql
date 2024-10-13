/*
  Warnings:

  - Made the column `lastName` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zipCode` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "language" SET NOT NULL,
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "zipCode" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL;
