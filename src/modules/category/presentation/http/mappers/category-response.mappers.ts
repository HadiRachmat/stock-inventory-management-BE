import type { CategoryEntity } from '../../../domain/entities/categories.entity.js';
import type { CategoryResponseDto } from '../../types/category-response.dto.js';

export const toCategoryResponse = (
  category: CategoryEntity,
): CategoryResponseDto => ({
  id: category.id,
  name: category.name,
  description: category.description,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
});

export const toCategoryResponses = (
  categories: CategoryEntity[],
): CategoryResponseDto[] => categories.map(toCategoryResponse);
