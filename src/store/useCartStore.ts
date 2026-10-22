import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types';
import { OFFERS } from '../data/offers';

interface CartState {
  items: CartItem[];
  appliedCoupon: string | null;
  couponDiscountValue: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getSubtotal: () => number;
  getMrpTotal: () => number;
  getProductDiscount: () => number;
  getCouponDiscount: () => number;
  getDeliveryFee: (deliveryType?: 'standard' | 'express' | 'hospital_pickup') => number;
  getTotal: (deliveryType?: 'standard' | 'express' | 'hospital_pickup') => number;
  getItemCount: () => number;
  requiresPrescription: () => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Preload one prescription item and one OTC item so first-time visitors can immediately test checkout!
        {
          product: {
            id: 'prod-1',
            slug: 'paracetamol-500mg-tablets',
            name: 'Crocin Advance Paracetamol 500mg',
            genericName: 'Paracetamol IP',
            brand: 'Crocin',
            manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
            category: 'fever-cold',
            strength: '500mg',
            dosageForm: 'Tablet',
            packSize: '15 Tablets Strip',
            rating: 4.8,
            ratingCount: 1240,
            mrp: 40,
            sellingPrice: 32,
            discountPercent: 20,
            inStock: true,
            stockCount: 45,
            prescriptionRequired: false,
            images: [
              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
            ],
            description: 'Fast-absorbing paracetamol formulation for fever and body aches.',
            overview: 'Crocin Advance tablet with Optizorb fast absorption technology.',
            uses: ['Fever', 'Headache', 'Muscle pain'],
            directions: '1-2 tablets every 4-6 hours.',
            ingredients: ['Paracetamol IP 500mg'],
            warnings: ['Do not exceed stated dose.'],
            precautions: ['Avoid alcohol.'],
            sideEffects: ['None reported at normal dose'],
            storage: 'Store below 30°C.'
          },
          quantity: 2
        },
        {
          product: {
            id: 'prod-7',
            slug: 'vitamin-d3-60k-capsules',
            name: 'Uprise-D3 60K Cholecalciferol Softgel Capsules',
            genericName: 'Cholecalciferol IP 60,000 IU',
            brand: 'Uprise-D3',
            manufacturer: 'Alkem Laboratories Ltd',
            category: 'vitamins',
            strength: '60,000 IU',
            dosageForm: 'Capsule',
            packSize: '4 Softgels Strip',
            rating: 4.9,
            ratingCount: 3100,
            mrp: 145,
            sellingPrice: 116,
            discountPercent: 20,
            inStock: true,
            stockCount: 92,
            prescriptionRequired: false,
            images: [
              'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=600&q=80',
            ],
            description: 'High-potency weekly Vitamin D3 supplement for bone health.',
            overview: 'Vitamin D vital for calcium absorption.',
            uses: ['Vitamin D deficiency', 'Bone weakness'],
            directions: '1 capsule weekly after meal.',
            ingredients: ['Cholecalciferol 60,000 IU'],
            warnings: ['Do not exceed suggested weekly dosage.'],
            precautions: ['Follow doctor instructions.'],
            sideEffects: ['None at regular dose'],
            storage: 'Store below 25°C.'
          },
          quantity: 1
        }
      ],
      appliedCoupon: null,
      couponDiscountValue: 0,

      addToCart: (product: Product, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, couponDiscountValue: 0 });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = OFFERS.find((o) => o.code === cleanCode);
        const subtotal = get().getSubtotal();

        if (!found) {
          return { success: false, message: 'Invalid coupon code.' };
        }
        if (subtotal < found.minOrderValue) {
          return {
            success: false,
            message: `Minimum order amount of ₹${found.minOrderValue} required for this coupon.`,
          };
        }

        let discount = 0;
        if (found.discountType === 'percentage') {
          discount = Math.round((subtotal * found.discountValue) / 100);
        } else {
          discount = found.discountValue;
        }

        set({ appliedCoupon: cleanCode, couponDiscountValue: discount });
        return { success: true, message: `Coupon ${cleanCode} applied! Saved ₹${discount}.` };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, couponDiscountValue: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.sellingPrice * item.quantity,
          0
        );
      },

      getMrpTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.mrp * item.quantity,
          0
        );
      },

      getProductDiscount: () => {
        return get().getMrpTotal() - get().getSubtotal();
      },

      getCouponDiscount: () => {
        return get().couponDiscountValue;
      },

      getDeliveryFee: (deliveryType = 'standard') => {
        if (deliveryType === 'hospital_pickup') return 0;
        const subtotal = get().getSubtotal();
        if (subtotal >= 500) return 0; // Free delivery over ₹500
        if (deliveryType === 'express') return 80;
        return 40; // Standard delivery fee
      },

      getTotal: (deliveryType = 'standard') => {
        const subtotal = get().getSubtotal();
        const delivery = get().getDeliveryFee(deliveryType);
        const coupon = get().getCouponDiscount();
        return Math.max(0, subtotal + delivery - coupon);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      requiresPrescription: () => {
        return get().items.some((item) => item.product.prescriptionRequired);
      },
    }),
    {
      name: 'apexcart-storage-v1',
    }
  )
);
