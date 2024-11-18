/*
  Warnings:

  - Added the required column `quantity` to the `ProductsOnOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ProductsOnOrders" ADD COLUMN     "quantity" INTEGER NOT NULL;
