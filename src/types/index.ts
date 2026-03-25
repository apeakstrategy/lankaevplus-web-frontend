// Type definitions

export interface Route {
  path: string
  name: string
}

// User types (matching backend)
export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: UserRole
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  // Frontend-specific fields
  name?: string
  phone?: string
  address?: string
}

// Product types (matching backend schema)
export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  sku?: string
  status: ProductStatus
  imageUrl?: string
  category?: string
  createdAt?: string
  updatedAt?: string
  // Frontend display fields
  image?: string
  inStock?: boolean
  rating?: number
  specifications?: Record<string, string>
}

// Order types (matching backend schema)
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product?: Product
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  totalAmount: number
  status: OrderStatus
  notes?: string
  items: OrderItem[]
  createdAt?: string
  updatedAt?: string
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ApiError {
  statusCode: number
  message: string
  timestamp: string
  path: string
}
