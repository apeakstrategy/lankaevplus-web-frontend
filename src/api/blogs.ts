import api from '../config/api';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  author?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const blogApi = {
  // Get all published blogs
  getAll: async (category?: string): Promise<Blog[]> => {
    const params = category ? { category } : {};
    const response = await api.get<Blog[]>('/blogs', { params });
    return response.data;
  },

  // Get single blog by slug
  getBySlug: async (slug: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${slug}`);
    return response.data;
  },

  // Get blog categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/blogs/categories');
    return response.data;
  },
};
