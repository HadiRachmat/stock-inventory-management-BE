import { SupplierRepository } from '../../domain/repositories/suppliers.repository.js';
import { SupplierEntity } from '../../domain/entities/suppliers.entity.js';

export interface SupplierRepositoryDependencies {
  supplierRepository: SupplierRepository;
}

export type CreateSupplierRequest = Pick<
  SupplierEntity,
  'name' | 'address' | 'email' | 'phone'
>;

