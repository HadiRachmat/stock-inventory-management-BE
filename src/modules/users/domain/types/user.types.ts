import { EmailVo } from '../value-objects/email.vo.js';
import { NameVo } from '../value-objects/name.vo.js';
import { RoleVo } from '../value-objects/role.vo.js';

export interface UserProps {
  id: number;
  name: NameVo;
  email: EmailVo;
  passwordHash: string;
  role: RoleVo;
  isActive: boolean;
}

export interface CreateUserProps {
  name: NameVo;
  email: EmailVo;
  role: RoleVo;
  passwordHash: string;
}

export interface UpdateUserProps {
  name?: NameVo;
  isActive?: boolean;
}
