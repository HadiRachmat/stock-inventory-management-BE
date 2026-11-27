import type { CategoryRepository } from '../../domain/repositories/category.repository.js';
import { CategoryEntity } from '../../domain/entities/categories.entity.js';

export interface CategoryRepositoryDependencies {
  categoryRepository: CategoryRepository;
}

export type CreateCategoryRequest = Pick<
  CategoryEntity,
  'name' | 'description'
>;
