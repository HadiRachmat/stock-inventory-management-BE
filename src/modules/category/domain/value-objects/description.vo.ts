import { ErrorException } from '../../../../common/exception/error-exception.js';

const normalizeDescription = (description: string): string => {
  const descriptions = description;

  switch (true) {
    case descriptions.length > 255:
      throw new ErrorException('Description cannot exceed 255 characters', 400);
    case descriptions.length < 3:
      throw new ErrorException(
        'Description cannot be less than 3 characters',
        400,
      );
    case descriptions != description.toString():
      throw new ErrorException(
        'Description can only contain letters and spaces',
        400,
      );
    default:
      return descriptions;
  }
};

export class DescriptionVo {
  private constructor(private readonly descriptions: string) {}
  static create(description: string): DescriptionVo {
    const createdDescription = normalizeDescription(description);
    if (createdDescription !== normalizeDescription(description)) {
      throw new ErrorException('Invalid description', 400);
    }
    return new DescriptionVo(createdDescription);
  }

  getValue(): string {
    return this.descriptions;
  }

  equals(other: DescriptionVo): boolean {
    return this.descriptions === other.descriptions;
  }
}
