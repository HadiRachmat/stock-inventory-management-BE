import * as CONSTANT from '../../../../common/constant/constanst.js';
import { ErrorException } from '../../../../common/exception/error-exception.js';

export class RoleVo {
  private constructor(private readonly role: number) {}

  static create(roles: number): RoleVo {
    if (
      roles !== CONSTANT.USER_ROLE_ADMIN &&
      roles !== CONSTANT.USER_USER_STAF &&
      roles !== CONSTANT.USER_ROLE_MANAGER
    ) {
      throw new ErrorException('Invalid role', 400);
    }
    return new RoleVo(roles);
  }

  getValue(): number {
    return this.role;
  }

  equals(other: RoleVo): boolean {
    return this.role === other.role;
  }
}
