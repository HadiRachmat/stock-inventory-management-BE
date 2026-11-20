import { ErrorException } from '../../../../common/exception/error-exception.js';

import type { SupplierEntity } from '../../domain/entities/suppliers.entity.js';
import type { SupplierRepositoryDependencies } from '../types/supplier-application.types.js';

export const findSupplierByIdUseCase = ({
  supplierRepository,
}: SupplierRepositoryDependencies) => {
  return async (id: number): Promise<SupplierEntity> => {
    const supplier = await supplierRepository.findById(id);

    if (!supplier) {
      throw new ErrorException('user not found', 404);
    }

    return supplier;
  };
};
