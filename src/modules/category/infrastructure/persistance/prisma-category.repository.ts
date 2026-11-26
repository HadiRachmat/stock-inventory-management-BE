import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma.service.js';
import { CategoryRepository } from '../../domain/repositories/category.repository.js';
import type { CreateCategoryProps } from '../../domain/types/categories-domain.types.js';
import type { CategoryEntity } from '../../domain/entities/categories.entity.js';
import { toCategoryEntity } from '../mappers/category.persistance-mappers.js';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(request: CreateCategoryProps): Promise<CategoryEntity> {
    const category = await this.prisma.category.create({
      data: {
        name: request.name.getValue(),
        description: request.description.getValue(),
      },
    });
    return toCategoryEntity(category);
  }
}
