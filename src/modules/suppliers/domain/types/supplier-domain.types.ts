import { NameVo } from '../value-objects/nameVo.vo.js';
import { AddressVo } from '../value-objects/addressVo.vo.js';
import { PhoneVo } from '../value-objects/phoneVo.vo.js';
import { EmailVo } from '../value-objects/emailVo.vo.js';

export interface SupplierProps {
  id: number;
  name: NameVo;
  address: AddressVo;
  phone: PhoneVo;
  email: EmailVo;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSupplierProps = Pick<
  SupplierProps,
  'name' | 'address' | 'phone' | 'email'
>;

export type UpdateSupplierProps = Partial<
  Pick<SupplierProps, 'name' | 'address' | 'phone' | 'email'>
>;

export type SupplierFilter = Partial<
  Pick<SupplierProps, 'name' | 'address' | 'phone' | 'email'>
>;
