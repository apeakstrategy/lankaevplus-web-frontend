import api from '../config/api';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number | null;
  discountPercent?: number;
  stock: number;
  sku?: string;
  status: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const productApi = {
  getAll: async (category?: string): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products', {
      params: category ? { category } : {},
    });
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/products/categories');
    return response.data;
  },
};
