import { z } from "zod";

export const apparatusSchema = z.object({
  id: z.string({ message: "ID must be a string" }).optional(),
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),
  competitionId: z.string(),
});
