'use server'

import { auth } from "@/auth"
import { createApiResponse } from "@/helpers/response-data"
import { prisma } from "@/prisma"
import { ProductSchema } from "@/schemas/product-schema"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { deleteImage, uploadImage } from "../global-action"

export const getImage = async () => {
  try {

    // console.log(
    //   await getSignedUrl(
    //     S3,
    //     new GetObjectCommand({ Bucket: "fullstack-crm", Key: "response.jpg" })
    //   ),
    // );
    return createApiResponse(true, 'ok', {})
  } catch (error) {
    console.log(error);

  }
}

export const countProduct = async () => {
  const session = await auth()

  if (!session?.user.id) {
    throw new Error('User ID is missing')
  }
  try {
    const data = await prisma.product.count({
      where: {
        userId: session?.user.id,
      },
    });

    return { success: true, message: 'Get product success', data }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal Server Error' }
  }
}

export const getProducts = async ({ search, page = 1, limit = 10 }: { search?: string, page?: number, limit?: number }) => {

  const offset = (page - 1) * limit

  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const queryFilter: Prisma.ProductWhereInput = {
      userId: session.user.id,
      ...(search && {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    }

    const [totalCount, data] = await Promise.all([
      prisma.product.count({ where: queryFilter }),
      prisma.product.findMany({
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


export const getProduct = async ({ id }: { id: string }) => {
  try {
    const data = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) return { success: false, message: 'Product not found' }

    return { success: true, message: 'Get product success', data }

  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal Server Error' }
  }
}

export const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const productData = await prisma.product.findUnique({
      where: { id }
    })

    if (productData && productData.imageName != '') {
      await deleteImage(productData.imageName)
    }

    const data = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    if (!data) return createApiResponse(false, 'Product not found', {})

    revalidatePath('/products')

    return createApiResponse(true, 'Delete product success!!', {})

  } catch (error) {
    console.log(error);
    return createApiResponse(false, 'Internal Server Error', {})
  }
}

export const upsertProduct = async (value: ProductSchema, formData: FormData) => {
  const productId = formData.get('productId') as string
  const plainImage = formData.get('plainImage')

  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is missing')
    }

    const { name, url } = plainImage != 'undefined' ? await uploadImage(plainImage!) : { name: '', url: '' }

    if (plainImage != 'undefined' && value.imageName != '') {
      await deleteImage(value.imageName)
    }

    const response = await prisma.product.upsert({
      where: { id: productId },
      update: {
        ...value,
        imageName: plainImage != 'undefined' ? name : value.imageName,
        imageUrl: plainImage != 'undefined' ? url : value.imageUrl
      },
      create: {
        ...value,
        imageName: plainImage != 'undefined' ? name : value.imageName,
        imageUrl: plainImage != 'undefined' ? url : value.imageUrl,
        userId: session?.user.id
      },
    })

    revalidatePath(`/products/update/${response.id}`)

    return createApiResponse(true, `Product ${productId ? "updated" : "created"} successfully!`, {})

  } catch (error) {
    console.log(error);
    return createApiResponse(false, `Internal server error`, {})
  }
}