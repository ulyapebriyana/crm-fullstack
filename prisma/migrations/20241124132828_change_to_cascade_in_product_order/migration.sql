-- DropForeignKey
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrders" DROP CONSTRAINT "ProductsOnOrders_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductsOnOrders" ADD CONSTRAINT "ProductsOnOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrders" ADD CONSTRAINT "ProductsOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
