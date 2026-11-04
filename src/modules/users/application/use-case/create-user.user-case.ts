import type { UserEntity } from '../../domain/entities/user.entity.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import type { PasswordHasherPort } from '../ports/password-hasher.port.js';
import type { CreateUserProps } from '../../domain/types/user.types.js';
import type {
  CreateUserInput,
  CreateUserDependencies,
} from '../types/user-application.types.js';

import { NameVo } from '../../domain/value-objects/name.vo.js';
import { EmailVo } from '../../domain/value-objects/email.vo.js';
import { RoleVo } from '../../domain/value-objects/role.vo.js';
import { IsActiveVo } from '../../domain/value-objects/isActive.vo.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

export const createUserUseCase = ({
  userRepository,
  passwordHasher,
}: CreateUserDependencies) => {
  return async (request: CreateUserInput): Promise<UserEntity> => {
    try {
      console.log('[DEBUG 1] Create User Use Case Started');

      const name = NameVo.create(request.name);
      const email = EmailVo.create(request.email);
      const role = RoleVo.create(request.role);
      const isActive = IsActiveVo.create(request.isActive);

      const existingUser = await userRepository.findByEmail(email.getValue());

      if (existingUser) {
        throw new ErrorException('User with this email already exists', 409);
      }

      const passwordHash = await passwordHasher.hash(request.passwordHash);

      const result = await userRepository.create({
        name,
        email,
        role,
        isActive,
        passwordHash,
      });

      console.log('[DEBUG 8] User Saved:', result.id);

      return result;
    } catch (error) {
      console.error('[DEBUG ERROR] Create User Failed:', error);
      throw error;
    }
  };
};
