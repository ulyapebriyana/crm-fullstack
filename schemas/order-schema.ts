import { z } from "zod";

export const orderSchema = z.object({
  customerId: z.string(),
  total: z.number(),
  note: z.string(),
  paymentStatus: z.string(),
  products: z.array(z.object({
    id: z.string(),
    quantity: z.number()
  }))
});

export type OrderSchema = z.infer<typeof orderSchema>;
