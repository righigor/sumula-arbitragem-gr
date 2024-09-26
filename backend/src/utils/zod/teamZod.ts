import { z } from "zod";

export const teamSchema = z.object({
  name: z.string().min(3).max(255),
  logo: z.string().min(3).max(255).optional(),
});