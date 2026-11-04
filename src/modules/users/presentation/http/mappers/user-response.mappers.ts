import type { UserEntity } from '../../../domain/entities/user.entity.js';

import type { UserResponseDto } from '../dto/user-response.dto.js';

export const toUserResponse = (user: UserEntity): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const toUserResponses = (users: UserEntity[]): UserResponseDto[] =>
  users.map(toUserResponse);
