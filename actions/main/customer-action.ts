'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { CustomerSchema, CustomerWithFullname } from "@/schemas/customer-schema"
import { Customer } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const getCustomers = async ({ search }: { search?: string }): Promise<CustomerWithFullname[]> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }
    const data = await prisma.customer.findMany({
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

export const getCustomer = async ({ id }: { id: string }): Promise<Customer | null> => {
  try {
    const data = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    return data || null;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const createCustomer = async (values: CustomerSchema) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const customer = await prisma.customer.findFirst({
      where: {
        userId: session?.user.id,
        email: values.email
      }
    })

    await prisma.customer.create({
      data: {
        ...values,
        userId: session?.user.id
      },
    })

    return {
      success: true,
      message: 'Customer created successfully!',
      data: customer
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