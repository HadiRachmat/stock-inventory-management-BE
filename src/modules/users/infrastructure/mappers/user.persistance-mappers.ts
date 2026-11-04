import { UserEntity } from '../../domain/entities/user.entity.js';
import { NameVo } from '../../domain/value-objects/name.vo.js';
import { EmailVo } from '../../domain/value-objects/email.vo.js';
import { RoleVo } from '../../domain/value-objects/role.vo.js';
import { IsActiveVo } from '../../domain/value-objects/isActive.vo.js';

import type { Prisma } from '../../../../../generated/prisma/client.js';

type UserRecord = Prisma.UserGetPayload<{}>;

export const toUserEntity = (record: UserRecord): UserEntity => {
  return UserEntity.reconstitute({
    id: record.id,
    name: NameVo.create(record.name),
    email: EmailVo.create(record.email),
    passwordHash: record.passwordHash,
    role: RoleVo.create(record.role),
    isActive: IsActiveVo.create(record.isActive),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
};

export const toUserEntities = (records: UserRecord[]): UserEntity[] => {
  return records.map(toUserEntity);
};
