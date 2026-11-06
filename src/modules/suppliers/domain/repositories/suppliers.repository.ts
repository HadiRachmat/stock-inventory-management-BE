import { SupplierEntity } from '../entities/suppliers.entity.js';

import type {
  CreateSupplierProps,
  UpdateSupplierProps,
  SupplierFilter,
} from '../types/supplier-domain.types.js';

export const SUPPLIER_REPOSITORY = Symbol('SUPPLIER_REPOSITORY');

export interface SupplierRepository {
  create(data: CreateSupplierProps): Promise<SupplierEntity>;

  findAll(filter?: SupplierFilter): Promise<SupplierEntity[]>;

  findById(id: number): Promise<SupplierEntity | null>;

  update(id: number, data: UpdateSupplierProps): Promise<SupplierEntity>;

  delete(id: number): Promise<void>;
}
