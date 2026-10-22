import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // Product IDs
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: ['prod-8', 'prod-4'], // Initial saved items

      toggleWishlist: (productId: string) => {
        const isPresent = get().items.includes(productId);
        if (isPresent) {
          set({ items: get().items.filter((id) => id !== productId) });
          return false;
        } else {
          set({ items: [...get().items, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'apexwishlist-storage-v1',
    }
  )
);
