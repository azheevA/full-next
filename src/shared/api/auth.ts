import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email("Некорректный email"),
  password: z.string().min(8).max(30),
});

export const signInSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8).max(30),
});
