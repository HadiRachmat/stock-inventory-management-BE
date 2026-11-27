import type { CategoryEntity } from '../../domain/entities/categories.entity.js';
import type {
  CategoryRepositoryDependencies,
  CreateCategoryRequest,
} from '../types/category.application.types.js';

import { NameVo } from '../../domain/value-objects/name.vo.js';
import { DescriptionVo } from '../../domain/value-objects/description.vo.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

export const createCategoryUseCase = ({
  categoryRepository,
}: CategoryRepositoryDependencies) => {
  return async (request: CreateCategoryRequest): Promise<CategoryEntity> => {
    try {
      const name = NameVo.create(request.name);
      const description = DescriptionVo.create(request.description);

      const result = await categoryRepository.create({
        name,
        description,
      });

      return result;
    } catch (error) {
      console.error('[DEBUG ERROR] Create Category Failed:', error);
      throw error;
    }
  };
};
