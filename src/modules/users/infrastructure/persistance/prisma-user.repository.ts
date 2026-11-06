import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma.service.js';
import { UserRepository } from '../../domain/repositories/user.repository.js';
import type {
  CreateUserProps,
  UpdateUserProps,
  UserFilter,
} fy)rom '../../domain/types/user.types.js';
import type { UserEntity } from '../../domain/entities/user.entity.js';
import {
  toUserEntity,
  toUserEntities,
} from '../mappers/user.persistance-mappers.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserProps): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name.getValue(),
        email: data.email.getValue(),
        passwordHash: data.passwordHash,
        role: data.role.getValue(),
        isActive: data.isActive.getValue(),
      },
    });
    return toUserEntity(user);
  }
  async findAll(filter?: UserFilter): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        ...(filter?.name && { name: { contains: filter.name.getValue() } }),
        ...(filter?.email && { email: { contains: filter.email.getValue() } }),
        ...(filter?.role && { role: filter.role.getValue() }),
        ...(filter?.isActive !== undefined && {
          isActive: filter.isActive.getValue(),
        }),
      },
    });
    return toUserEntities(users);
  }
  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new ErrorException('User not found', 404);
    }
    return user ? toUserEntity(user) : null;
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    console.log('[REPOSITORY 1] findByEmail called:', email);

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log('[REPOSITORY 2] Prisma result:', user);

    if (!user) {
      return null;
    }

    return user ? toUserEntity(user) : null;
  }
  async update(id: number, data: UpdateUserProps): Promise<UserEntity> {
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: { data },
    });
    return toUserEntity(updateUser);
  }
  async updateStatus(id: number, isActive: boolean): Promise<UserEntity> {
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: isActive ? 1 : 0,
      },
    });
    return toUserEntity(updateUser);
  }
  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
