import type { SupplierEntity } from '../../../domain/entities/suppliers.entity.js';
import type { SupplierResponseDTO } from '../../types/supplier/supplier-response.dto.js';

export const toSupplierResponse = (
  supplier: SupplierEntity,
): SupplierResponseDTO => ({
  id: supplier.id,
  name: supplier.name,
  email: supplier.email,
  address: supplier.address,
  phone: supplier.phone,
});

export const toSupplierResponses = (
  supplier: SupplierEntity[],
): SupplierResponseDTO[] => 
  supplier.map(toSupplierResponse);
;
