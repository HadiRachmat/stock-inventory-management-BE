import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma.service.js';
import { SupplierRepository } from '../../domain/repositories/suppliers.repository.js';
import type {
  CreateSupplierProps,
  UpdateSupplierProps,
  SupplierFilter,
} from '../../domain/types/supplier-domain.types.js';
import type { SupplierEntity } from '../../domain/entities/suppliers.entity.js';
import {
  toSupplierEntity,
  toSupplierEntities,
} from '../mapppers/supplier-persistance.mappers.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

@Injectable()
export class PrismaSupplierRepository implements SupplierRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateSupplierProps): Promise<SupplierEntity> {
    const request = await this.prisma.supplier.create({
      data: {
        name: data.name.getValue(),
        email: data.email.getValue(),
        address: data.address.getValue(),
        phone: data.phone.getValue(),
      },
    });
    return toSupplierEntity(request);
  }

  async findAll(filter?: SupplierFilter): Promise<SupplierEntity[]> {
    const request = await this.prisma.supplier.findMany({
      where: {
        ...(filter?.name && { name: { contains: filter.name.getValue() } }),
        ...(filter?.email && { email: { contains: filter.email.getValue() } }),
        ...(filter?.address && {
          address: { contains: filter.address.getValue() },
        }),
      },
    });
    return toSupplierEntities(request);
  }

  async findById(id: number): Promise<SupplierEntity | null> {
    const request = await this.prisma.supplier.findUnique({
      where: {
        id,
      },
    });
    return request ? toSupplierEntity(request) : null;
  }

  async update(id: number, data: UpdateSupplierProps): Promise<SupplierEntity> {
    const request = await this.prisma.supplier.update({
      where: {
        id,
      },
      data: { data },
    });
    return toSupplierEntity(request);
  }
  async delete(id: number): Promise<void> {
    await this.prisma.supplier.delete({
      where: {
        id,
      },
    });
  }
}
