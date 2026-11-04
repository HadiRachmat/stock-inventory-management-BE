import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().trim().min(1),

  email: z.string().trim().email(),

  password: z.string().min(8),

  role: z.union([z.literal(1), z.literal(2)]),

  isActive: z.union([z.literal(0), z.literal(1)]).default(1),
});
