/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from "@/auth";
import { createApiResponse } from "@/helpers/response-data";
import { prisma } from "@/prisma";
import { OrderSchema } from "@/schemas/order-schema";
import { Prisma } from "@prisma/client";
import moment from "moment";
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
          userId: session.user.id,
          orderId: `ORD-${moment().format('YYYYMMDD')}-${Math.floor(1000 + Math.random() * 9000)}`
        },
        update: {
          ...restValue,
          paymentStatus: "PENDING"
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

export const getOrders = async ({ search = "", page = 1, limit = 10 }: { search?: string, page?: number, limit?: number }) => {

  const offset = (page - 1) * limit

  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const queryFilter: Prisma.OrderWhereInput = {
      userId: session.user.id,
      ...(search && {
        orderId: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    }

    const [totalCount, data] = await Promise.all([
      prisma.order.count({ where: queryFilter }),
      prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: queryFilter,
        skip: offset,
        take: limit,
        include: {
          _count: {
            select: {
              products: true, 
            },
          },
        },
      }),
    ])

    return createApiResponse(true, 'Create data success', {
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
      result: data,
    })
  } catch (error) {
    console.log(error)
    createApiResponse(false, 'Internal Server Error', {})
  }
}

export const countOrder = async () => {
  const session = await auth()

  if (!session?.user.id) {
    throw new Error('User ID is missing')
  }
  try {
    const data = await prisma.order.count({
      where: {
        userId: session?.user.id,
      },
    });

    return { success: true, message: 'Get data success', data }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal Server Error' }
  }
}

export const deleteOrder = async ({ id }: { id: string }) => {
  try {
    const data = await prisma.order.delete({
      where: {
        id: id,
      },
    });

    if (!data) return createApiResponse(false, 'data not found', {})

    revalidatePath('/orders')

    return createApiResponse(true, 'Delete data success!!', {})

  } catch (error) {
    console.log(error);
    return createApiResponse(false, 'Internal Server Error', {})
  }
}
