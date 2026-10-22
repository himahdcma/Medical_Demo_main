import { Product, Category, Doctor, Order, Prescription, NotificationItem } from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { DOCTORS } from '../data/doctors';
import { INITIAL_ORDERS, INITIAL_PRESCRIPTIONS, INITIAL_NOTIFICATIONS } from '../data/mockData';

// Simulated delay helper for realistic network behavior
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FilterParams {
  category?: string;
  brand?: string;
  prescriptionRequired?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  rating?: number;
  sortBy?: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export const mockApi = {
  // Products
  async getProducts(filters?: FilterParams): Promise<Product[]> {
    await delay();
    let result = [...PRODUCTS];

    if (filters?.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters?.brand) {
      result = result.filter((p) => p.brand.toLowerCase() === filters.brand?.toLowerCase());
    }

    if (filters?.prescriptionRequired !== undefined) {
      result = result.filter((p) => p.prescriptionRequired === filters.prescriptionRequired);
    }

    if (filters?.inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockCount > 0);
    }

    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.sellingPrice >= (filters.minPrice ?? 0));
    }

    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.sellingPrice <= (filters.maxPrice ?? 999999));
    }

    if (filters?.rating !== undefined && filters.rating > 0) {
      result = result.filter((p) => p.rating >= (filters.rating ?? 0));
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.sellingPrice - b.sellingPrice);
          break;
        case 'price-desc':
          result.sort((a, b) => b.sellingPrice - a.sellingPrice);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.reverse();
          break;
        case 'popularity':
        default:
          result.sort((a, b) => b.ratingCount - a.ratingCount);
          break;
      }
    }

    return result;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    await delay();
    return PRODUCTS.find((p) => p.slug === slug);
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay();
    return PRODUCTS.find((p) => p.id === id);
  },

  async searchProducts(query: string): Promise<{ products: Product[]; didYouMean?: string }> {
    await delay();
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return { products: [] };

    // Spell correction / "Did you mean" heuristics for medical terms
    let didYouMean: string | undefined;
    if (cleanQuery.includes('paracitamol') || cleanQuery.includes('paracetamol 500') || cleanQuery.includes('para 500')) {
      didYouMean = 'Paracetamol';
    } else if (cleanQuery.includes('crocin advance') || cleanQuery.includes('crocin tablet')) {
      didYouMean = 'Crocin';
    } else if (cleanQuery.includes('sugar medicine') || cleanQuery.includes('sugar tablet')) {
      didYouMean = 'Metformin (Diabetes Care)';
    } else if (cleanQuery.includes('bp tablet') || cleanQuery.includes('blood pressure')) {
      didYouMean = 'Telmisartan';
    }

    const matches = PRODUCTS.filter((p) => {
      const q = cleanQuery;
      return (
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.uses.some((u) => u.toLowerCase().includes(q))
      );
    });

    return { products: matches, didYouMean };
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    await delay();
    return CATEGORIES;
  },

  // Doctors
  async getDoctors(department?: string): Promise<Doctor[]> {
    await delay();
    if (department && department !== 'all') {
      return DOCTORS.filter((d) => d.department.toLowerCase() === department.toLowerCase());
    }
    return DOCTORS;
  },

  async getDoctorById(id: string): Promise<Doctor | undefined> {
    await delay();
    return DOCTORS.find((d) => d.id === id);
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    await delay();
    return INITIAL_ORDERS;
  },

  // Prescriptions
  async getPrescriptions(): Promise<Prescription[]> {
    await delay();
    return INITIAL_PRESCRIPTIONS;
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    await delay();
    return INITIAL_NOTIFICATIONS;
  }
};
