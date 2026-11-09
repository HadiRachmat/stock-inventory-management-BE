import {
  Body,
  Controller,
  Get,
  Inject,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import type { SupplierRepository } from '../../../domain/repositories/suppliers.repository.js';
import { SUPPLIER_REPOSITORY } from '../../../domain/repositories/suppliers.repository.js';

import { createSuppliersSchmema } from '../dto/create-supplier.dto.js';
import { createSupplierUseCase } from '../../../application/use-case/create-supplier.use-case.js';
import { ErrorException } from '../../../../../common/exception/error-exception.js';

import {
  toSupplierResponse,
  toSupplierResponses,
} from '../mappers/supplier-response.mappers.js';

@Controller('suppliers')
export class SupplierController {
  private readonly createSupplier: ReturnType<typeof createSupplierUseCase>;

  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    supplierRepository: SupplierRepository,
  ) {
    this.createSupplier = createSupplierUseCase({
      supplierRepository,
    });
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: unknown) {
    const result = createSuppliersSchmema.safeParse(request);

    if (!result.success) {
      throw new ErrorException('validation is failed', 400);
    }
    const { ...supplierData } = result.data;
    const supplierRequest = await this.createSupplier({
      ...supplierData,
    });

    return {
      message: 'suplier created successfully',
      data: toSupplierResponse(supplierRequest),
    };
  }
}
