import { ErrorException } from '../../../../common/exception/error-exception.js';
import * as CONSTANT from '../../../../common/constant/constanst.js';

export class IsActiveVo {
  private constructor(private readonly isActive: number) {}

  static create(isActive: number): IsActiveVo {
    if (
      isActive !== CONSTANT.STATUS_ACTIVED &&
      isActive !== CONSTANT.STATUS_INACTIVED
    ) {
      throw new ErrorException('Invalid isActive value', 400);
    }
    return new IsActiveVo(isActive);
  }

  getValue(): number {
    return this.isActive;
  }

  equals(other: IsActiveVo): boolean {
    return this.isActive === other.isActive;
  }
}
