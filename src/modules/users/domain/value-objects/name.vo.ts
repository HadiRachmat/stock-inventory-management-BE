import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizeName = (name: string): string => {
  const names = name;

  switch (true) {
    case names.length > 50:
      throw new ErrorException('Name cannot exceed 50 characters', 400);
    case names.length < 3:
      throw new ErrorException('Name cannot be less than 3 characters', 400);
    case names != name.toString().replace(/[^a-zA-Z\s]/g, ''):
      throw new ErrorException('Name can only contain letters and spaces', 400);
    default:
      return names;
  }
};

export class NameVo {
  private constructor(private readonly names: string) {}
  static create(name: string): NameVo {
    const createdName = normalizeName(name);
    if (createdName !== normalizeName(name)) {
      throw new ErrorException('Invalid name', 400);
    }
    return new NameVo(createdName);
  }

  getValue(): string {
    return this.names;
  }

  equals(other: NameVo): boolean {
    return this.names === other.names;
  }
}
