import { NotFoundException } from '@nestjs/common';

import type { UserEntity } from '../../domain/entities/user.entity.js';
import type { UserRepositoryDependencies } from '../types/user-application.types.js';
export const findUserById = ({
  userRepository,
}: UserRepositoryDependencies) => {
  return async (id: number): Promise<UserEntity> => {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  };
};
