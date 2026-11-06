import { z } from 'zod';

import { RoleVo } from '../../../../domain/value-objects/role.vo.js';
import { IsActiveVo } from '../../../../domain/value-objects/isActive.vo.js';

export const userFilterSchema = z.object({
  search: z.string().trim().optional(),

  role: z
    .string()
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      const role = Number(value);

      return RoleVo.create(role);
    }),

  isActive: z
    .enum(['true', 'false'])
    .optional()
    .transform((value) => {
      if (value === undefined) return undefined;

      return IsActiveVo.create(value === 'true' ? 1 : 0);
    }),
});

export type UserFilterDto = z.infer<typeof userFilterSchema>;
