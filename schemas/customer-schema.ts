import { Customer } from "@prisma/client";
import { z } from "zod";

export const customerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "This field must contain at least 1 characters" })
    .max(50, { message: "This field only accepts less than 50 characters" }),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  language: z.string(),
  company: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  zipCode: z.string(),
  note: z.string(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;

export interface CustomerWithFullname extends Customer {
  fullName: string;
}
