import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizeAddress = (address: string): string => {
  return address.trim();
};

const isValidAddress = (address: string): boolean => {
  return address.length > 0 && address.length <= 255;
};

export class AddressVo {
  private constructor(private readonly address: string) {}

  static create(address: string): AddressVo {
    const normalizedAddress = normalizeAddress(address);
    if (!isValidAddress(normalizedAddress)) {
      throw new ErrorException('Invalid address', 400);
    }
    return new AddressVo(normalizedAddress);
  }

  getValue(): string {
    return this.address;
  }

  equals(other: AddressVo): boolean {
    return this.address === other.address;
  }
}
