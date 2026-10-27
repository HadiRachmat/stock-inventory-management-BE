import { HttpException } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor(
    message: string,
    status: number,
    public readonly errorCode?: string
  ) {
    super ({
      success: false,
      message,
      errorCode: errorCode,
    }, status);
  }
}
