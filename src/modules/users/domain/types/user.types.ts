import { EmailVo } from '../value-objects/email.vo.js';
import { NameVo } from '../value-objects/name.vo.js';
import { RoleVo } from '../value-objects/role.vo.js';
import { IsActiveVo } from '../value-objects/isActive.vo.js';

export interface UserProps {
  id: number;
  name: NameVo;
  email: EmailVo;
  passwordHash: string;
  role: RoleVo;
  isActive: IsActiveVo;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserProps = Pick<
  UserProps,
  'name' | 'email' | 'passwordHash' | 'role' | 'isActive'
>;

export type UpdateUserProps = Partial<
  Pick<UserProps, 'name' | 'email' | 'role' | 'isActive'>
>;

export type UserFilter = Partial<
  Pick<UserProps, 'name' | 'email' | 'role' | 'isActive'>
>;
