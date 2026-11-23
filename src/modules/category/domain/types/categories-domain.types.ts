import { ProductEntity } from '../../../products/domain/entities/product.entity.js';

export interface CategoryProps {
  id: number;
  name: string;
  description: string;
  product?: ProductEntity[];
  createdAt: Date;
  updatedAt: Date;
}
