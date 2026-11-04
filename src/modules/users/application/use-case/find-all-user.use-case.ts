import type { UserEntity } from '../../domain/entities/user.entity.js';
import type { UserRepository } from '../../domain/repositories/user.repository.js';
import type { UserFilter } from '../../domain/types/user.types.js';

interface Dependencies {
  userRepository: UserRepository;
}

export const findAllUsers = ({ userRepository }: Dependencies) => {
  return async (filter?: UserFilter): Promise<UserEntity[]> => {
    return userRepository.findAll(filter);
  };
};
