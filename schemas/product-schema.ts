import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string(),
  imageUrl: z.string(),
  imageName: z.string(),
  price: z.number(),
  compareAtPrice: z.number(),
  isChangeTax: z.boolean(),
  costPerItem: z.number(),
  profit: z.number(),
  margin: z.number(),
  isTrackQuantity: z.boolean(),
  quantity: z.number(),
  isContinueSelling: z.boolean(),
  isHasBarcode: z.boolean(),
  isActive: z.boolean(),
  isPublishToOnlineStore: z.boolean(),
  isPublishToShop: z.boolean(),
  isPublishToInternational: z.boolean(),
});

export type ProductSchema = z.infer<typeof productSchema>;
