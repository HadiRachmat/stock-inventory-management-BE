import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Inject,
} from '@nestjs/common';

import type { CategoryRepository } from '../../domain/repositories/category.repository.js';

import { CATEGORY_REPOSITORY } from '../../domain/repositories/category.repository.js';

import { createCategoryUseCase } from '../../application/use-case/create-category.use-case.js';

import { createCategorySchema } from '../http/dto/create-category.dto.js';

import { toCategoryResponse } from '../http/mappers/category-response.mappers.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

@Controller('categories')
export class CategoryController {
  private readonly createCategory: ReturnType<typeof createCategoryUseCase>;

  constructor(
    @Inject(CATEGORY_REPOSITORY)
    categoryRepository: CategoryRepository,
  ) {
    this.createCategory = createCategoryUseCase({
      categoryRepository,
    });
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: unknown) {
    const request = createCategorySchema.safeParse(body);
    if (!request.success) {
      throw new ErrorException('Invalid request body', HttpStatus.BAD_REQUEST);
    }
    const category = await this.createCategory(request.data);
    return toCategoryResponse(category);
  }
}
