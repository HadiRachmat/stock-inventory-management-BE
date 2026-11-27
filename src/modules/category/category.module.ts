import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module.js';
import { PrismaService } from '../../infrastructure/database/prisma.service.js';
import { CATEGORY_REPOSITORY } from '../category/domain/repositories/category.repository.js';
import { PrismaCategoryRepository } from '../category/infrastructure/persistance/prisma-category.repository.js';
import { CategoryController } from '../category/presentation/controller/category.contoller.js';

@Module({
  controllers: [CategoryController],
  imports: [PrismaModule],
  providers: [
    {
      provide: CATEGORY_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        new PrismaCategoryRepository(prisma),
    },
  ],
  exports: [CATEGORY_REPOSITORY],
})
export class CategoryModule {}
