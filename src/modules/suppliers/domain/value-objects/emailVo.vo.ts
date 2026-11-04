import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export class EmailVo {
  private constructor(private readonly emails: string) {}

  static create(email: string): EmailVo {
    const normalizedEmail = normalizeEmail(email);
    if (normalizedEmail.length > 255 || !isValidEmail(normalizedEmail)) {
      throw new ErrorException('Invalid email address', 400);
    }
    return new EmailVo(normalizedEmail);
  }

  getValue(): string {
    return this.emails;
  }

  equals(other: EmailVo): boolean {
    return this.emails === other.emails;
  }
}
