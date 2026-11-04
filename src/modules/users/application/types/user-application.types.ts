import type { UserRepository } from '../../domain/repositories/user.repository.js';
import { UserEntity } from '../../domain/entities/user.entity.js';
import type { PasswordHasherPort } from '../ports/password-hasher.port.js';

export interface UserRepositoryDependencies {
  userRepository: UserRepository;
}

export type CreateUserInput = Pick<
  UserEntity,
  'name' | 'email' | 'passwordHash' | 'role' | 'isActive'
>;

export interface CreateUserDependencies {
  userRepository: UserRepository;
  passwordHasher: PasswordHasherPort;
}

export interface UpdateUserRequest {
  readonly id: number;
  readonly name?: string;
  readonly email?: string;
  readonly role?: number;
  readonly isActive?: number;
}
