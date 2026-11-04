import type { UserEntity } from '../entities/user.entity.js';

import type {
  CreateUserProps,
  UpdateUserProps,
  UserFilter,
} from '../types/user.types.js';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  create(data: CreateUserProps): Promise<UserEntity>;

  findAll(filter?: UserFilter): Promise<UserEntity[]>;

  findById(id: number): Promise<UserEntity | null>;

  findByEmail(email: string): Promise<UserEntity | null>;

  update(id: number, data: UpdateUserProps): Promise<UserEntity>;

  updateStatus(id: number, isActive: boolean): Promise<UserEntity>;

  delete(id: number): Promise<void>;
}
