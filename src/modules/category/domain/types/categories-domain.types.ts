import { ProductEntity } from '../../../products/domain/entities/product.entity.js';
import { NameVo } from '../value-objects/name.vo.js';
import { DescriptionVo } from '../value-objects/description.vo.js';

export interface CategoryProps {
  id: number;
  name: NameVo;
  description: DescriptionVo;
  product?: ProductEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategoryProps = Pick<
  CategoryProps,
  'name' | 'description'
>;
