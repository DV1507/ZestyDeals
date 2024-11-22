import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().int().nonnegative("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  // image: z.string().url("Image must be a valid URL").nullable().optional(),
  // categoryId: z
  //   .number()
  //   .int()
  //   .nonnegative("Category ID must be a non-negative integer"),
});
