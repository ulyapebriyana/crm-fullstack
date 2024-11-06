-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "imageName" TEXT,
    "price" DECIMAL(65,30),
    "compareAtPrice" DECIMAL(65,30),
    "isChangeTax" BOOLEAN NOT NULL DEFAULT true,
    "costPerItem" DECIMAL(65,30),
    "profit" DECIMAL(65,30),
    "margin" DECIMAL(65,30),
    "isTrackQuantity" BOOLEAN NOT NULL DEFAULT true,
    "quantity" INTEGER,
    "isContinueSelling" BOOLEAN NOT NULL DEFAULT false,
    "isHasBarcode" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublishToOnlineStore" BOOLEAN NOT NULL DEFAULT false,
    "isPublishToShop" BOOLEAN NOT NULL DEFAULT false,
    "isPublishToInternational" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
