import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  name: z.string().min(1, { message: "Name is required" }),
  number: z
    .string()
    .min(10, { message: "Number must be at least 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
