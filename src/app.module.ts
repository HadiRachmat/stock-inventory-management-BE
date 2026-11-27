import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/database/prisma.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { UserModule } from './modules/users/user.module.js';
import { SupplierModule } from './modules/suppliers/supplier.module.js';
import { CategoryModule } from './modules/category/category.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    UserModule,
    SupplierModule,
    CategoryModule,
  ],
})
export class AppModule {}
