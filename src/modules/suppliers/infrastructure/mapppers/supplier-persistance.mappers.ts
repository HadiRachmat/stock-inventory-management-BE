import { SupplierEntity } from '../../domain/entities/suppliers.entity.js';
import { NameVo } from '../../domain/value-objects/nameVo.vo.js';
import { EmailVo } from '../../domain/value-objects/emailVo.vo.js';
import { AddressVo } from '../../domain/value-objects/addressVo.vo.js';
import { PhoneVo } from '../../domain/value-objects/phoneVo.vo.js';

import type { Prisma } from '../../../../../generated/prisma/client.js';

type SupplierRecord = Prisma.supplierGetPayload<{}>;

export const toSupplierEntity = (record: SupplierRecord): SupplierEntity => {
  return SupplierEntity.reconstitute({
    id: record.id,
    name: NameVo.create(record.name),
    email: EmailVo.create(record.email),
    address: AddressVo.create(record.address),
    phone: PhoneVo.create(record.phone),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
};

export const toSupplierEntities = (
  record: SupplierRecord[],
): SupplierEntity[] => {
  return record.map(toSupplierEntity);
};
