import type { SupplierEntity } from '../../domain/entities/suppliers.entity.js';
import type {
  CreateSupplierRequest,
  SupplierRepositoryDependencies,
} from '../types/supplier-application.types.js';

import { NameVo } from '../../domain/value-objects/nameVo.vo.js';
import { AddressVo } from '../../domain/value-objects/addressVo.vo.js';
import { EmailVo } from '../../domain/value-objects/emailVo.vo.js';
import { PhoneVo } from '../../domain/value-objects/phoneVo.vo.js';

import { ErrorException } from '../../../../common/exception/error-exception.js';

export const createSupplierUseCase = ({
  supplierRepository,
}: SupplierRepositoryDependencies) => {
  return async (request: CreateSupplierRequest): Promise<SupplierEntity> => {
    try {
      const name = NameVo.create(request.name);
      const email = EmailVo.create(request.email);
      const address = AddressVo.create(request.address);
      const phone = PhoneVo.create(request.phone);

      const result = await supplierRepository.create({
        name,
        email,
        address,
        phone,
      });

      return result;
    } catch (error) {
      throw new ErrorException('failed request supplier', 400);
    }
  };
};
