'use server'

import { auth } from "@/auth"
import { createApiResponse } from "@/helpers/response-data"
import { prisma } from "@/prisma"
import { CustomerSchema } from "@/schemas/customer-schema"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const getCustomers = async ({ search, page = 1, limit = 10 }: { search?: string, page?: number, limit?: number }) => {
  const offset = (page - 1) * limit
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const queryFilter: Prisma.CustomerWhereInput = {
      userId: session.user.id,
      ...(search && {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    }

    const [totalCount, data] = await Promise.all([
      prisma.customer.count({ where: queryFilter }),
      prisma.customer.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: queryFilter,
        skip: offset,
        take: limit,
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

export const countCustomer = async () => {
  const session = await auth()

  if (!session?.user.id) {
    throw new Error('User ID is missing')
  }
  try {
    const data = await prisma.customer.count({
      where: {
        userId: session?.user.id,
      },
    });

    return { success: true, message: 'Get customer success', data }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal Server Error' }
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const importCustomers = async ({ data }: { data: any }) => {
  try {
    const jsonData = JSON.parse(data)

    const session = await auth()
    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    for (const json of jsonData) {
      const customer = await prisma.customer.findFirst({
        where: {
          email: json["Email"],
          userId: session?.user.id
        }
      })
      if (customer) {
        await prisma.customer.update({
          where: {
            id: customer.id
          },
          data: {
            firstName: json["First Name"] || "",
            lastName: json["Last Name"] || "",
            phoneNumber: json["Phone Number"].toString() || "",
            country: json["Country"] || "",
            language: json["Language"] || "",
            company: json["Company"] || "",
            address: json["Address"] || "",
            city: json["City"] || "",
            province: json["Province"] || "",
            zipCode: json["Zip Code"].toString() || "",
            note: json["Note"] || ""
          }
        })
      } else {
        await prisma.customer.create({
          data: {
            email: json["Email"] || "",
            firstName: json["First Name"] || "",
            lastName: json["Last Name"] || "",
            phoneNumber: json["Phone Number"].toString() || "",
            country: json["Country"] || "",
            language: json["Language"] || "",
            company: json["Company"] || "",
            address: json["Address"] || "",
            city: json["City"] || "",
            province: json["Province"] || "",
            note: json["Note"] || "",
            zipCode: json["Zip Code"].toString() || "",
            userId: session?.user.id
          }
        })
      }
    }

    revalidatePath("/customers")

    return {
      success: true,
      message: "Imported data successfully!"
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Internal server error'
    }
  }
}