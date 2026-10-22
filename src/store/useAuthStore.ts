import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address } from '../types';
import { INITIAL_USER, INITIAL_ADDRESSES } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  selectedLocation: {
    city: string;
    pincode: string;
  };
  addresses: Address[];
  setLocation: (city: string, pincode: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  switchRole: (role: 'patient' | 'pharmacist' | 'admin') => void;
  login: (email: string, role?: 'patient' | 'pharmacist' | 'admin') => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: INITIAL_USER,
      isAuthenticated: true,
      selectedLocation: {
        city: 'Kakinada',
        pincode: '533001',
      },
      addresses: INITIAL_ADDRESSES,

      setLocation: (city: string, pincode: string) => {
        set({ selectedLocation: { city, pincode } });
      },

      addAddress: (newAddr) => {
        const id = `addr-${Date.now()}`;
        const address: Address = { ...newAddr, id };
        if (address.isDefault) {
          const updated = get().addresses.map((a) => ({ ...a, isDefault: false }));
          set({ addresses: [address, ...updated] });
        } else {
          set({ addresses: [...get().addresses, address] });
        }
      },

      deleteAddress: (id: string) => {
        set({ addresses: get().addresses.filter((a) => a.id !== id) });
      },

      setDefaultAddress: (id: string) => {
        set({
          addresses: get().addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        });
      },

      switchRole: (role) => {
        const current = get().user;
        if (current) {
          set({
            user: {
              ...current,
              role,
              name: role === 'patient' ? 'Prabhas Gorusu' : role === 'pharmacist' ? 'Dr. S. Varma (Chief Pharmacist)' : 'Admin Director',
            },
          });
        }
      },

      login: (email: string, role = 'patient') => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            name: email.split('@')[0].replace('.', ' '),
            email,
            phone: '+91 98765 43210',
            role,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            joinedDate: 'Today',
          },
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'apexauth-storage-v1',
    }
  )
);
