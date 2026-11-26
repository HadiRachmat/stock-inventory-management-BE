import { CategoryEntity } from '../entities/categories.entity.js';
import type { CreateCategoryProps } from '../types/categories-domain.types.js';

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');

export interface CategoryRepository {
  create(request: CreateCategoryProps): Promise<CategoryEntity>;
}

