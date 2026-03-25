import api from '../config/api';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location?: string;
  clientName?: string;
  systemSize?: string;
  systemType?: string;
  completionDate?: string;
  imageUrl?: string;
  galleryImages?: string[];
  features?: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const projectApi = {
  // Get all published projects
  getAll: async (systemType?: string): Promise<Project[]> => {
    const params = systemType ? { systemType } : {};
    const response = await api.get<Project[]>('/projects', { params });
    return response.data;
  },

  // Get featured projects
  getFeatured: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects/featured');
    return response.data;
  },

  // Get single project by slug
  getBySlug: async (slug: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${slug}`);
    return response.data;
  },

  // Get system types
  getSystemTypes: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/projects/system-types');
    return response.data;
  },
};
