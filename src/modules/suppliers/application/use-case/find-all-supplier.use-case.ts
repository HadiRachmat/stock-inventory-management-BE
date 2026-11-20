import type { SupplierEntity } from '../../domain/entities/suppliers.entity.js';
import type { SupplierRepository } from '../../domain/repositories/suppliers.repository.js';
import type { SupplierFilter } from '../../domain/types/supplier-domain.types.js';

export const findAllSuppliersUseCase = ({
  supplierRepository,
}: {
  supplierRepository: SupplierRepository;
}) => {
  return async (filter?: SupplierFilter): Promise<SupplierEntity[]> => {
    return supplierRepository.findAll(filter);
  };
};
