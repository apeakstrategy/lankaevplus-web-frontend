import api from '../config/api';

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  items: OrderItemInput[];
  notes?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  totalAmount: number;
  status: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const orderApi = {
  create: async (data: CreateOrderDto): Promise<Order> => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  getByEmail: async (email: string): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders/my-orders', {
      params: { email },
    });
    return response.data;
  },

  track: async (orderNumber: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/track/${orderNumber}`);
    return response.data;
  },
};
