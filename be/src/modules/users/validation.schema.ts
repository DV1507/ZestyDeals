import { z } from "zod";
import { UserRole } from "./enum";

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  name: z.string().min(1, { message: "Name is required" }),
  number: z
    .string()
    .min(10, { message: "Number must be at least 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum([UserRole.CUSTOMER, UserRole.SELLER], {
    message: "Role is required and must be a valid role",
  }),
});

export const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email format" }), // Assuming username is an email
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }), // Minimum password length
});
