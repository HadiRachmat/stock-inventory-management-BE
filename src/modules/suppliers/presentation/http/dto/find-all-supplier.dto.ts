import { z } from 'zod';
import { NameVo } from '../../../domain/value-objects/nameVo.vo.js';
import { EmailVo } from '../../../domain/value-objects/emailVo.vo.js';
import { PhoneVo } from '../../../domain/value-objects/phoneVo.vo.js';
import { AddressVo } from '../../../domain/value-objects/addressVo.vo.js';

export const supplierFilterSchema = z.object({
  search: z.string().trim().optional(),
  name: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      return NameVo.create(value);
    }),
  email: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      return EmailVo.create(value);
    }),
  phone: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      return PhoneVo.create(value);
    }),
  address: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      return AddressVo.create(value);
    }),
});

export type SupplierFilterDto = z.infer<typeof supplierFilterSchema>;
