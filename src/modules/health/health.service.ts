import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service.js';
import { ErrorException } from '../../common/exception/error-exception.js';

@Injectable()
export class HealthService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkHealth() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: {
          api: 'oke',
          database: 'oke',
        },
      };
    } catch {
      throw new ErrorException(
        'Database connection failed',
        503,
        'DATABASE_CONNECTION_FAILED',
      );
    }
  }
}
