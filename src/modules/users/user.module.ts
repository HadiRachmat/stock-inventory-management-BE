import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module.js';
import { PrismaService } from '../../infrastructure/database/prisma.service.js';
import { USER_REPOSITORY } from '../users/domain/repositories/user.repository.js';
import { PASSWORD_HASHER_PORT } from '../users/application/ports/password-hasher.port.js';
import { PrismaUserRepository } from '../users/infrastructure/persistance/prisma-user.repository.js';
import { createbcryptPasswordHasher } from '../../infrastructure/security/bcrypt-password-hash.js';
import { UsersController } from '../users/presentation/controller/user.controller.js';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
    },
    {
      provide: PASSWORD_HASHER_PORT,
      useFactory: () => createbcryptPasswordHasher(),
    },
  ],
  exports: [USER_REPOSITORY, PASSWORD_HASHER_PORT],
})
export class UserModule {}
