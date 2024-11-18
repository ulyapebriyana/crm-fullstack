/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from "@/auth";
import { createApiResponse } from "@/helpers/response-data";
import { prisma } from "@/prisma";
import { OrderSchema } from "@/schemas/order-schema";
import { revalidatePath } from "next/cache";

export const upsertOrder = async (value: OrderSchema, orderId?: string) => {
  const { products, ...restValue } = value;

  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User ID is missing");
    }

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.upsert({
        where: { id: orderId || "" },
        create: {
          ...restValue,
          paymentStatus: "PENDING",
          userId: session.user.id
        },
        update: {
          ...restValue,
          paymentStatus: "PENDING",
        },
      });

      if (orderId) {
        await tx.productsOnOrders.deleteMany({
          where: { orderId: orderId },
        });
      }

      if (products && products.length > 0) {
        await tx.productsOnOrders.createMany({
          data: products.map((product: any) => ({
            orderId: order.id,
            productId: product.id,
            quantity: product.quantity,
          })),
        });
      }

      return order;
    });

    revalidatePath(`/orders/update/${result.id}`);

    return createApiResponse(
      true,
      `Order ${orderId ? "updated" : "created"} successfully!`,
      {}
    );
  } catch (error) {
    console.error("Error in upsertProduct:", error);
    return createApiResponse(false, "Internal server error", {});
  }
};
