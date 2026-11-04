import type { UserEntity } from '../../domain/entities/user.entity.js';

import type {
  UpdateUserRequest,
  UserRepositoryDependencies,
} from '../types/user-application.types.js';

import { NameVo } from '../../domain/value-objects/name.vo.js';
import { EmailVo } from '../../domain/value-objects/email.vo.js';
import { RoleVo } from '../../domain/value-objects/role.vo.js';
import { IsActiveVo } from '../../domain/value-objects/isActive.vo.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

export const updateUserUseCase = ({
  userRepository,
}: UserRepositoryDependencies) => {
  return async (request: UpdateUserRequest): Promise<UserEntity> => {
    const existingUser = await userRepository.findById(request.id);
    if (!existingUser) {
      throw new ErrorException('User not found', 404);
    }

    const data: Partial<{
      name: NameVo;
      email: EmailVo;
      role: RoleVo;
      isActive: IsActiveVo;
    }> = {};


    if (request.name) {
      data.name = NameVo.create(request.name);
    }
    if (request.email) {
      data.email = EmailVo.create(request.email);
    }
    if (request.role !== undefined) {
      data.role = RoleVo.create(request.role);
    }
    if (request.isActive !== undefined) {
      data.isActive = IsActiveVo.create(request.isActive);
    }

    const updatedUser = await userRepository.update(request.id, data);
    return updatedUser;

  };
};
