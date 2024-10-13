'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { CustomerSchema, CustomerWithFullname } from "@/schemas/customer-schema"
import { revalidatePath } from "next/cache"

export const getCustomers = async ({ search }: { search?: string }): Promise<CustomerWithFullname[]> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }
    const data = await prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userId: session?.user.id,
        ...(search && {
          email: {
            contains: search,
            mode: 'insensitive',
          }
        })
      }
    })
    const customersWithFullname = data.map((customer) => ({
      ...customer,
      fullName: `${customer.firstName} ${customer.lastName || ''}`.trim(),
    }))

    return customersWithFullname || []

  } catch (error) {
    console.log(error);
    return []
  }
}

export const getCustomer = async ({ id }: { id: string }) => {
  try {
    const data = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) return { success: false, message: 'Customer not found' }

    return { success: true, message: 'Get customer success', data }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal Server Error' }
  }
}

export const upsertCustomer = async (values: CustomerSchema, id?: string) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const customer = await prisma.customer.findFirst({
      where: {
        userId: session?.user.id,
        email: values.email,
        id: {
          not: id
        }
      }
    })

    if (customer) {
      return {
        success: false,
        message: 'Customer already exist!',
      }
    }

    const response = await prisma.customer.upsert({
      where: { id: id || crypto.randomUUID() },
      update: {
        ...values,
      },
      create: {
        ...values,
        userId: session?.user.id
      },
    })

    revalidatePath(`/customers/update/${response.id}`)

    return {
      success: true,
      message: `Customer ${id ? "updated" : "created"} successfully!`,
      data: response
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Internal server error'
    }
  }
}

export const deleteCustomer = async ({ id }: { id: string }) => {
  try {
    await prisma.customer.delete({
      where: { id }
    })
    revalidatePath("/customers")
    return {
      success: true,
      message: 'Delete data success!'
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Internal server error'
    }
  }
}