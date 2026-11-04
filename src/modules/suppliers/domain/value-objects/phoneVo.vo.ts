import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizePhone = (phone: string): string => {
  return phone.trim();
};

const isValidPhone = (phone: string): boolean => {
  return phone.length > 0 && phone.length <= 15;
};

export class PhoneVo {
  private constructor(private readonly phone: string) {}

  static create(phone: string): PhoneVo {
    const normalizedPhone = normalizePhone(phone);
    if (!isValidPhone(normalizedPhone)) {
      throw new ErrorException('Invalid phone', 400);
    }
    return new PhoneVo(normalizedPhone);
  }

  getValue(): string {
    return this.phone;
  }

  equals(other: PhoneVo): boolean {
    return this.phone === other.phone;
  }
}
