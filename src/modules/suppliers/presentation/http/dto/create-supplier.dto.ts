import { z } from 'zod';

export const createSuppliersschmema = z.object({
  name: z.string().trim().min(3, { message: "Name cann't be empty" }).max(50),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(15, { message: 'Phone number must be at most 15 digits' }),
  address: z
    .string()
    .trim()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(100, { message: 'Address must be at most 100 characters long' }),
});
