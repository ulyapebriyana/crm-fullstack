-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "note" TEXT,
ALTER COLUMN "orderId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "paymentStatus" DROP NOT NULL;
