import { CategoryEntity } from '../../domain/entities/categories.entity.js';
import { NameVo } from '../../domain/value-objects/name.vo.js';
import { DescriptionVo } from '../../domain/value-objects/description.vo.js';

import type { Prisma } from '../../../../../generated/prisma/client.js';

type CategorRecord = Prisma.CategoryGetPayload<{}>;

export const toCategoryEntity = (record: CategorRecord): CategoryEntity => {
  return CategoryEntity.reconstitute({
    id: record.id,
    name: NameVo.create(record.name),
    description: DescriptionVo.create(record.description),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
};
