import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({ message: "Name is missing" })
    .min(3, { message: "Name must have at least 3 letters" })
    .max(255, { message: "Name must have at most 255 letters" }),
  level: z
    .number({ message: "Level is missing" })
    .int()
    .min(1, { message: "Level must be greater than 0" }),
});
