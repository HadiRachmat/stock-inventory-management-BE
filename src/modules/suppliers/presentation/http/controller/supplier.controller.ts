import {
  Body,
  Controller,
  Get,
  Inject,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import type { SupplierRepository } from '../../../domain/repositories/suppliers.repository.js';
import { SUPPLIER_REPOSITORY } from '../../../domain/repositories/suppliers.repository.js';

import { createSupplierUseCase } from '../../../application/use-case/create-supplier.use-case.js';
import { findAllSuppliersUseCase } from '../../../application/use-case/find-all-supplier.use-case.js';
import { findSupplierByIdUseCase } from '../../../application/use-case/find-by-id-supplier.use-case.js';

import { createSuppliersSchmema } from '../dto/create-supplier.dto.js';
import { supplierFilterSchema } from '../dto/find-all-supplier.dto.js';

import {
  toSupplierResponse,
  toSupplierResponses,
} from '../mappers/supplier-response.mappers.js';

import { ErrorException } from '../../../../../common/exception/error-exception.js';
import { Return } from '@prisma/client/runtime/client';
@Controller('suppliers')
export class SupplierController {
  private readonly createSupplier: ReturnType<typeof createSupplierUseCase>;
  private readonly findAllSuppliers: Return<typeof findAllSuppliersUseCase>;
  private readonly findSupplierById: Return<typeof findSupplierByIdUseCase>;

  constructor(
    @Inject(SUPPLIER_REPOSITORY)
    supplierRepository: SupplierRepository,
  ) {
    this.createSupplier = createSupplierUseCase({
      supplierRepository,
    });
    this.findAllSuppliers = findAllSuppliersUseCase({
      supplierRepository,
    });
    this.findSupplierById = findSupplierByIdUseCase({
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

  @Get()
  async findAll(@Query() query: unknown) {
    const result = supplierFilterSchema.safeParse(query);

    if (!result.success) {
      throw new ErrorException('validation data is failed ', 400);
    }

    const supplier = await this.findAllSuppliers(result.data);

    return {
      message: 'user retrieved successfully',
      data: toSupplierResponses(supplier),
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const supplier = await this.findSupplierById(id);

    return {
      message: 'supplier retrieved successfully',
      data: toSupplierResponse(supplier),
    };
  }
}
