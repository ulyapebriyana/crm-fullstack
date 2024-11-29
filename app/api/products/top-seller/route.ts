import { auth } from '@/auth'
import { createApiResponse } from '@/helpers/response-data'
import { prisma } from '@/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(createApiResponse(false, 'Not authorized', {}), { status: 401 })
    }
    const topSellingProducts = await prisma.productsOnOrders.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5
    });

    const productsWithDetails = await Promise.all(
      topSellingProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          ...product,
          totalSold: item._sum.quantity,
        };
      })
    );

    return NextResponse.json(createApiResponse(true, 'Ok', productsWithDetails), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(createApiResponse(false, 'Internal server error', {}), { status: 500 })
  }

}