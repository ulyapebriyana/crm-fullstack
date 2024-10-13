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