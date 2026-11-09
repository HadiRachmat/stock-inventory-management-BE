import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module.js';
import { PrismaService } from '../../infrastructure/database/prisma.service.js';
import { SUPPLIER_REPOSITORY } from './domain/repositories/suppliers.repository.js';
import { PrismaSupplierRepository } from './infrastructure/persistance/prisma-supplier.repository.js';
import { SupplierController } from './presentation/http/controller/supplier.controller.js';

@Module({
  controllers: [SupplierController],
  imports: [PrismaModule],
  providers: [
    {
      provide: SUPPLIER_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) =>
        new PrismaSupplierRepository(prisma),
    },
  ],
  exports: [SUPPLIER_REPOSITORY],
})
export class SupplierModule {}
