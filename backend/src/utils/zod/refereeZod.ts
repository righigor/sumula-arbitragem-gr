import { z } from "zod";

export const refereeSchema = z.object({
  name: z
    .string({ message: "Name is missing" })
    .min(3, { message: "Name must have at least 3 letters" })
    .max(255, { message: "Name must have at most 255 letters" }),
  email: z.string({ message: "Email format invalid" }).optional(),
  phone: z.string().optional(),

})