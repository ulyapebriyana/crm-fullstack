import { auth } from '@/auth'
import { createApiResponse } from '@/helpers/response-data'
import { prisma } from '@/prisma'
import { NextResponse, type NextRequest } from 'next/server'
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json(createApiResponse(false, 'Not authorized', {}), { status: 401 })
    }
    const customers = await prisma.customer.findMany({
      where: {
        userId: session.user.id
      }
    })

    const result = customers.map(customer => ({ fullName: `${customer.firstName} ${customer.lastName}`, value: customer.id }))
    return NextResponse.json(createApiResponse(true, 'Ok', result), { status: 200 })
  } catch (error) {
    console.log(error);
    return NextResponse.json(createApiResponse(false, 'Internal server error', {}), { status: 500 })
  }

}