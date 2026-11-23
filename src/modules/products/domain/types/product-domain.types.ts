export interface ProductProps {
  id: number;
  sku: string;
  name: string;
  description: string;
  unit: string;
  minimumStock: number;
  isActive: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  
}
