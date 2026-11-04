import { z } from 'zod';

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),

    email: z.string().trim().email().max(255).optional(),

    role: z
      .number()
      .int()
      .refine((value) => value === 1 || value === 2, {
        message: 'Role must be 1 (admin) or 2 (staff)',
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
