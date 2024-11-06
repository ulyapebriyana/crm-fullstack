/*
  Warnings:

  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageName` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `compareAtPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costPerItem` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profit` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `margin` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "imageName" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "compareAtPrice" SET NOT NULL,
ALTER COLUMN "costPerItem" SET NOT NULL,
ALTER COLUMN "profit" SET NOT NULL,
ALTER COLUMN "margin" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL;
