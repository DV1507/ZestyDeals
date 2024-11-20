import { UserRole } from "@/constant/enums";
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Please provide a valid email" }),
    name: z.string().min(1, { message: "Name is required" }),
    number: z
      .string()
      .min(10, { message: "Number must be at least 10 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    role: z.enum([UserRole.CUSTOMER, UserRole.SELLER], {
      message: "Role is required and must be a valid role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().email({ message: "Invalid email format" }), // Assuming username is an email
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }), // Minimum password length
});
