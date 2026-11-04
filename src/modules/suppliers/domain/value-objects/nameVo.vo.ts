import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizeName = (name: string): string => {
  return name.toLowerCase();
};

const isValidName = (name: string): boolean => {
  return name.length > 0 && name.length <= 100;
};

export class NameVo {
  private constructor(private readonly name: string) {}

  static create(name: string): NameVo {
    const normalizedName = normalizeName(name);
    if (!isValidName(normalizedName)) {
      throw new ErrorException('Invalid name', 400);
    }
    return new NameVo(normalizedName);
  }

  getValue(): string {
    return this.name;
  }

  equals(other: NameVo): boolean {
    return this.name === other.name;
  }
}
